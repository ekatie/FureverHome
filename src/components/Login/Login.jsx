import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" onClick={dispatch(login())}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
