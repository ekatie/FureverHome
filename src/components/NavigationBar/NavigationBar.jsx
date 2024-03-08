import React, { useState } from "react";
import "./NavigationBar.scss";
import logo from "../../assets/furever-home-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const state = useSelector((state) => state);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="left-align">
        <img src={logo} alt="Furever Home" className="logo" />
        <p className="logo-text">Furever Home</p>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/dogs" className="nav-link">
          Dogs
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
      </div>
      {!user ? (
        <div className="nav-buttons">
          <Link to="/login" className="nav-button">
            Log In
          </Link>
          <Link to="/register" className="nav-button">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="nav-buttons">
          <p className="user-greeting">Logged in as: {user.name}</p>
          <AccountCircleIcon
            sx={{ fontSize: 30 }}
            className="profile-icon"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/profile"
                className="dropdown-link"
                onClick={toggleDropdown}
              >
                Profile
              </Link>
              <Link
                to="/application"
                className="dropdown-link"
                onClick={toggleDropdown}
              >
                Application
              </Link>
              <Link
                to="/logout"
                className="dropdown-link"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
