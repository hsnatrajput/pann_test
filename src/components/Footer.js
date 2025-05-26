import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Footer.css";

const Footer = () => {

  const currentDate = new Date().toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi"
  }).replace("PM", "PM PKT").replace("AM", "AM PKT");

  return (
    <div className="footer-container mt-3 mt-md-4">
      <div className="footer-left">
        <img src="/images/Pann_logo.png" alt="Pann Logo" className="footer-logo" />
        <span className="tagline">AI Powered Business Verification & Instant Identity Monitoring</span>
      </div>
      <div className="footer-right">
        <p className="report-date">Report generated on {currentDate}</p>
        <p className="pann-ai-small">pann.ai</p>
      </div>
    </div>
  );
};

export default Footer;