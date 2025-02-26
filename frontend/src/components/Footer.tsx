import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
          © {currentYear} UBC GDSC. All rights reserved.
        </div>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/company/gdsc-ubc/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/gdscubc/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/dscubc/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
}
