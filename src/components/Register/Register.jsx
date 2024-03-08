import React, { useState } from "react";
import { useDispatch } from "react-redux";
import API, { setAuthToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { register } from "../../features/authSlice";

// Update to only require email and password for registration
// User name, phone, and date of birth can be updated in the user profile

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      formIsValid = false;
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match";
      formIsValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
      formIsValid = false;
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      errors.phone = "Phone number must be in the format 123-123-1234";
      formIsValid = false;
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }
    try {
      const response = await API.post("/auth", {
        email,
        password,
        password_confirmation: passwordConfirmation,
        name, // Include name in the request
        phone, // Include phone in the request
        date_of_birth: dateOfBirth, // Include date_of_birth in the request
      });
      // Extract token details from the response headers or body depending on your backend setup
      const { headers } = response;
      const authToken = headers["access-token"];
      const client = headers.client;
      const uid = headers.uid;

      // Set auth token for future requests
      setAuthToken(authToken);

      // Store token details in localStorage or another storage method
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ authToken, client, uid })
      );

      // Dispatch register action with user data
      dispatch(register({ user: response.data.data, token: authToken }));

      // On successful submission
      setSubmissionMessage("Registration successful! Redirecting...");

      // Redirect the user to their profile
      navigate("/profile");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      // On submission error within your catch block
      setSubmissionMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="page-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div style={{ color: "red" }}>*{errors.name}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div style={{ color: "red" }}>*{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div style={{ color: "red" }}>*{errors.password}</div>
        )}
        <input
          type="password"
          placeholder="Re-Type Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {errors.passwordConfirmation && (
          <div style={{ color: "red" }}>*{errors.passwordConfirmation}</div>
        )}
        <input
          type="text"
          placeholder="XXX-XXX-XXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <div style={{ color: "red" }}>*{errors.phone}</div>}
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        {errors.dateOfBirth && (
          <div style={{ color: "red" }}>{errors.dateOfBirth}</div>
        )}
        <button type="submit">Register</button>
      </form>
      {submissionMessage && <div>{submissionMessage}</div>}
    </div>
  );
}

export default Register;
