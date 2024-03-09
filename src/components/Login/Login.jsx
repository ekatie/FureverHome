import React, { useState } from "react";
import { useDispatch } from "react-redux";
import API, { setAuthToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      const response = await API.post("/login", { email, password });
      const { user, token } = response.data;

      // Store the token and user data in local storage
      localStorage.setItem("authTokens", JSON.stringify({ token }));
      localStorage.setItem("userData", JSON.stringify(user));

      // Dispatch the login action
      dispatch(login({ user, token }));
      setAuthToken(token);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <section className="form">
      <h1 className="page-title">Welcome back!</h1>
      <h2>Log in to continue.</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(email, password);
        }}
      >
        <label>Email</label>
        <input
          type="text"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className="prompt">
        Don't have an account?
        <Link to="/register" className="prompt-link">
          Sign Up
        </Link>
      </div>
    </section>
  );
}

export default Login;
