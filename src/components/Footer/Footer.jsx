import React from "react";
import "./Footer.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BadgeIcon from "@mui/icons-material/Badge";

function Footer() {
  return (
    <footer className="footer">
      <p>Furever Home</p>
      <div className="social-media">
        <a href="https://github.com/ekatie" className="social-link">
          <GitHubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/katiekucsera/"
          className="social-link"
        >
          <LinkedInIcon />
        </a>
        <a href="https://flowcv.com/resume/3m142pt9t6" className="social-link">
          <BadgeIcon />
        </a>
      </div>
      <a href="mailto:katie.kucsera@gmail.com" className="email-link">
        katie.kucsera@gmail.com
      </a>
    </footer>
  );
}

export default Footer;