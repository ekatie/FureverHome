import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  // Initialize state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use state values for email and password in the API call
      const response = await API.post("/auth/sign_in", {
        email,
        password,
      });

      // Extract token details from the response headers
      const authToken = response.headers["access-token"];
      const client = response.headers["client"];
      const uid = response.headers["uid"];

      // Store token details in localStorage for future requests
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ authToken, client, uid })
      );

      // Dispatch login action with user data
      dispatch(login({ user: response.data.data, token: authToken }));

      // Redirect the user to the home page
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("Login failed:", error.message);
      }
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
