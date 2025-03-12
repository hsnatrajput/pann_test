import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Footer.css"

const Footer = ({ pageNumber }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <img src="/images/Pann_logo.png" alt="Pann Logo" className="footer-logo" />
      <p className="text-muted">{pageNumber}/5</p>
    </div>
  );
};

export default Footer;
