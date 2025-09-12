// components/Footer.js
import { FaXTwitter, FaYoutube, FaGithub, FaLinkedinIn, FaTelegram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="ai-footer">
      <div className="ai-footer-row">
        <div className="ai-footer-col ai-footer-brand">
          <div className="ai-footer-logo">
            ALPHANSO AI
          </div>
          <div className="ai-footer-socials">
            <a href="#" title="Twitter"><FaXTwitter /></a>
            <a href="#" title="YouTube"><FaYoutube /></a>
            <a href="#" title="GitHub"><FaGithub /></a>
            <a href="#" title="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" title="Telegram"><FaTelegram /></a>
          </div>
          {/* <div className="ai-footer-apps">
            <img src="/appstore.svg" alt="App Store" />
            <img src="/playstore.svg" alt="Google Play" />
          </div> */}
        </div>
        <div className="ai-footer-col">
          <h4>AI Hub</h4>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
        </div>
        <div className="ai-footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
        <div className="ai-footer-col">
          <h4>Help</h4>
          <a href="#">Support</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
      <div className="ai-footer-bottom">
        <span>© 2025 ALPHANSO-AI. All rights reserved.</span>
      </div>
    </footer>
  );
}
