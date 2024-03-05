import React, { useState } from "react";
import "./NavigationBar.scss";
import logo from "../../assets/furever-home-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";

function NavigationBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="left-align">
        <img src={logo} alt="Furever Home" className="logo" />
        <p className="logo-text">Furever Home</p>
      </div>
      <div className="nav-links">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/dogs" className="nav-link">
          Dogs
        </a>
        <a href="/about" className="nav-link">
          About
        </a>
      </div>
      {!user ? (
        <div className="nav-buttons">
          <a href="/login" className="nav-button">
            Log In
          </a>
          <a href="/signup" className="nav-button">
            Sign Up
          </a>
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
              <a href="/profile" className="dropdown-link">
                Profile
              </a>
              <a href="/application" className="dropdown-link">
                Application
              </a>
              <a href="/logout" className="dropdown-link">
                Logout
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
