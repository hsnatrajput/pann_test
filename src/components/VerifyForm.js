import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import axios from "axios";
import "../styles/VerifyForm.css";

const VerifyForm = ({ setReportData }) => {
  const [legalName, setLegalName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleVerify = async () => {
    if (!legalName || !address) {
      alert("Please enter both Legal Entity Name and Address!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(
        "https://stingray-app-zycze.ondigitalocean.app/proxy/get_business_data",
        {
          business_name: legalName,
          business_address: address
        }
      );
      

      console.log("API Response:", response.data);

      const riskScore = response.data.scores?.find(s => s.type === "risk") || {};
      const kybScore = response.data.scores?.find(s => s.type === "kyb") || {};
      
      const officers = response.data.business?.business_officers || [];
      const officerNames = officers.map(officer => officer.name).join(", ");

      const transformedData = {
        businessName: response.data.name || legalName,
        businessID: response.data.business?.id,
        searchDate: new Date().toLocaleDateString(),
        legalEntityName: legalName,
        legalEntityAddress: address,
        email: response.data.email,
        tin: response.data.tin ,
        officers: officerNames ,
        phoneNumber: response.data.phone_number ,
        website: response.data.website ,
        riskRating: riskScore.rating ,
        riskLevel: riskScore.rating === "A" ? "Low Risk" : 
                  riskScore.rating === "B" ? "Medium Risk" : 
                  riskScore.rating === "C" ? "High Risk" : "N/A",
        kybRating: kybScore.rating ,
        kybLevel: kybScore.rating === "A" ? "Fully Verified" : 
                 kybScore.rating === "B" ? "Partially Verified" : 
                 kybScore.rating === "C" ? "Limited Verification" : "N/A",
        address: response.data.address,
        business: response.data.business ,
        businessOfficers: officers,
        watchlistHits: response.data.watchlist_hits ,
        registrations: response.data.business?.registrations ,
        incorporationDate: response.data.business?.incorporation_date ,
        incorporationState: response.data.business?.incorporation_state ,
        businessAge: response.data.business?.months_in_business ? 
                    `${Math.floor(response.data.business.months_in_business / 12)} years` : "N/A",
        structure: response.data.business?.structure 
      };

      console.log("Transformed Data:", transformedData);
      setReportData(transformedData);
      navigate("/report1");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection and try again.");
      } else {
        alert("Failed to generate report. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <img src="/images/Pann_logo.png" alt="Pann Logo" className="logo" />
      <div className="verify-container">
        <h1>Welcome to <span className="brand-name">Pann</span></h1>
        <p style={{ color: "#868DA6" }}>We help verify business identity through AI</p>

        <div className="input-container">
          <div className="input-box">
            <FaBriefcase className="icon" size={24} />
            <input
              type="text"
              placeholder="Enter Legal Entity Name"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
            />
          </div>
          <label>Legal Entity Name</label>
        </div>

        <div className="input-container">
          <div className="input-box">
            <GoLocation className="icon" size={24} />
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <label>Legal Entity Address</label>
        </div>

        <button className="verify-btn" onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify Now"}
        </button>
      </div>
    </div>
  );
};

export default VerifyForm;