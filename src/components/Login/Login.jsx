import React, { useState } from "react";
import { useDispatch } from "react-redux";
import API, { setAuthToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    console.log("Login form submitted:", email, password);
    try {
      const response = await API.post("/login", { email, password });
      console.log("Login response:", response);
      const { user, token } = response.data;

      // localStorage.setItem("authTokens", JSON.stringify(headers));
      // dispatch(login({ user: userData, token: headers["access-token"] }));
      dispatch(login({ user, token }));
      // setAuthToken(headers["access-token"]);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(email, password);
        }}
      >
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
