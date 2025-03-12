import React from "react";
import "../styles/PricingModal.css";

const PricingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2 className="modal-title">Pricing Plans</h2>
        <p className="modal-subtitle">Choose Your Best Plan</p>

        <div className="pricing-container">
          <div className="pricing-card basic">
            <h3>Basic</h3>
            <p className="price">$299</p>
            <ul>
              <li>PDF Report</li>
              <li>KYB Rating</li>
              <li>Risk Rating</li>
            </ul>
          </div>

          <div className="pricing-card premium">
            <h3>Premium</h3>
            <p className="price">$1499</p>
            <ul>
              <li>All Basic Report Features</li> 
              <li>3 Lien Filings</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>

          <div className="pricing-card enterprise">
            <h3>Enterprise</h3>
            <p className="price">Contact Us</p>
            <ul>
              <li>API Access</li>
              <li>24/7 Customer Support</li>
              <li>Global Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
