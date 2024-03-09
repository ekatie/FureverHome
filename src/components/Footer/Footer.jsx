import React from "react";
import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer className="footer">
      <p>Furever Home</p>
      <div className="social-media">
        <a href="https://www.instagram.com/" className="social-link">
          <InstagramIcon />
        </a>
        <a href="https://www.facebook.com/" className="social-link">
          <FacebookIcon />
        </a>
        <a href="https://twitter.com" className="social-link">
          <XIcon />
        </a>
        <a href="https://www.youtube.com/" className="social-link">
          <YouTubeIcon />
        </a>
      </div>
      <a href="mailto:info@fureverhome.com" className="email-link">
        info@fureverhome.com
      </a>
    </footer>
  );
}

export default Footer;

// set up email text to link to send mail to
