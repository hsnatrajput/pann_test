import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container mt-3 mt-md-4">
      <div className="footer-left">
        <img src="/images/Pann_logo.png" alt="Pann Logo" className="footer-logo" />
        <span className="tagline">AI Powered Business Verification & Instant Identity Monitoring</span>
      </div>
      <div className="footer-right">
        <p className="report-date">Report generated on May 23, 2025 04:44 PM PKT</p>
        <p className="pann-ai-small">pann.ai</p>
      </div>
    </div>
  );
};

export default Footer;