import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import axios from "axios";
import "../styles/VerifyForm.css";


const VerifyForm = ({ setReportData }) => {
  const [legalName, setLegalName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  
  const API_URL = process.env.REACT_APP_API_URL || "https://pann-app-base-edl9t.ondigitalocean.app";

  const replaceBaselayerWithPann = (value) => {
    if (typeof value === "string") {
      return value.replace(/baselayer/gi, "Pann");
    }
    return value;
  };

  const handleVerify = async (retries = 2) => {
    if (!legalName || !address) {
      setError("Please enter both Legal Entity Name and Address!");
      return;
    }
  
    setLoading(true);
    setError(""); // Clear any previous error
    try {
      const startTime = Date.now(); // Start time for response logging
      const response = await axios.post(
        `${API_URL}/get_business_data`,
        {
          business_name: legalName,
          business_address: address
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          timeout: 60000 // Increased to 60 seconds for slower responses
        }
      );
      
      const endTime = Date.now();
      console.log(`API Response Time: ${endTime - startTime}ms`);
      console.log("API Response:", response.data);

      if (response.data.state === "FAILED") {
        setError("No Match, Business not found");
        setLoading(false);
        return;
      }

      // Validate response
      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid API response: Expected an object");
      }

      const riskScore = response.data.scores?.find(s => s.type === "risk") || {};
      const kybScore = response.data.scores?.find(s => s.type === "kyb") || {};
      const officers = response.data.business?.business_officers || [];
      const officerNames = officers.map(officer => officer.name || "Unknown").join(", ");

      const transformedData = {
        businessName: replaceBaselayerWithPann(response.data.name || legalName),
        businessID: replaceBaselayerWithPann(response.data.business?.id || "N/A"),
        searchDate: replaceBaselayerWithPann(new Date().toLocaleDateString()),
        legalEntityName: replaceBaselayerWithPann(legalName),
        legalEntityAddress: replaceBaselayerWithPann(address),
        email: replaceBaselayerWithPann(response.data.email || "N/A"),
        tin: replaceBaselayerWithPann(response.data.tin || "N/A"),
        officers: replaceBaselayerWithPann(officerNames),
        phoneNumber: replaceBaselayerWithPann(response.data.phone_number || "N/A"),
        website: replaceBaselayerWithPann(response.data.website || "N/A"),
        riskRating: replaceBaselayerWithPann(riskScore.rating || "N/A"),
        riskLevel: replaceBaselayerWithPann(
          riskScore.rating === "A" ? "Low Risk" : 
          riskScore.rating === "B" ? "Medium Risk" : 
          riskScore.rating === "C" ? "High Risk" : "N/A"
        ),
        kybRating: replaceBaselayerWithPann(kybScore.rating || "N/A"),
        kybLevel: replaceBaselayerWithPann(
          kybScore.rating === "A" ? "Fully Verified" : 
          kybScore.rating === "B" ? "Partially Verified" : 
          kybScore.rating === "C" ? "Limited Verification" : "N/A"
        ),
        address: replaceBaselayerWithPann(response.data.address || "N/A"),
        business: response.data.business || {}, // Object, no replacement needed
        businessOfficers: officers.map(officer => ({
          name: replaceBaselayerWithPann(officer.name || "Unknown"),
          roles: replaceBaselayerWithPann(officer.titles?.join(", ") || "N/A"),
          sos_filings: officer.states?.length || officer.titles?.length || 0 // Number, no replacement
        })),
        watchlistHits: response.data.watchlist_hits || [], // Array of objects, no direct string replacement
        registrations: response.data.business?.registrations || [], // Array of objects, no direct string replacement
        incorporationDate: replaceBaselayerWithPann(response.data.business?.incorporation_date || "N/A"),
        incorporationState: replaceBaselayerWithPann(response.data.business?.incorporation_state || "N/A"),
        businessAge: replaceBaselayerWithPann(
          response.data.business?.months_in_business 
            ? `${Math.floor(response.data.business.months_in_business / 12)} years` 
            : "N/A"
        ),
        structure: replaceBaselayerWithPann(response.data.business?.structure || "N/A"),
        entityType: replaceBaselayerWithPann(response.data.business?.structure || "N/A"),
        naicsCode: replaceBaselayerWithPann(
          response.data.business?.predicted_naics?.length > 0 
            ? response.data.business.predicted_naics[0] 
            : "N/A"
        ),
        status: replaceBaselayerWithPann(response.data.business?.registrations?.[0]?.status || "N/A"),
        filingStatus: response.data.business?.registrations 
          ? [
              { name: replaceBaselayerWithPann("Active Filings"), value: response.data.business.registrations.filter(r => r.status === "active").length, color: "#E47628" },
              { name: replaceBaselayerWithPann("Inactive Filings"), value: response.data.business.registrations.filter(r => r.status !== "active").length, color: "#2F4532" },
              { name: replaceBaselayerWithPann("Unknown"), value: 0, color: "#F6CBA9" }
            ] 
          : null,
        registeredAgent: replaceBaselayerWithPann(response.data.business?.registrations?.[0]?.registered_agent?.name || "N/A"),
        registeredAgentAddress: replaceBaselayerWithPann(
          response.data.business?.registrations?.[0]?.registered_agent?.address 
            ? `${response.data.business.registrations[0].registered_agent.address.street || ''}, ${response.data.business.registrations[0].registered_agent.address.city || ''}, ${response.data.business.registrations[0].registered_agent.address.state || ''} ${response.data.business.registrations[0].registered_agent.address.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim()
            : "N/A"
        ),
        filingID: replaceBaselayerWithPann(response.data.business?.registrations?.[0]?.file_number || "N/A"),
        dateFiled: replaceBaselayerWithPann(response.data.business?.registrations?.[0]?.issue_date || "N/A"),
        addresses: response.data.business?.addresses?.map(addr => 
          replaceBaselayerWithPann(
            `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim()
          )
        ) || [],
        phoneNumbers: response.data.business?.phone_numbers?.map(num => replaceBaselayerWithPann(num)) || [],
        socialMedia: response.data.business?.social_profiles?.map(profile => 
          replaceBaselayerWithPann(`${profile.site || 'Unknown'}: ${profile.url || 'N/A'}`)
        ) || [],
        inquiryVariations: response.data.business?.registrations?.map(reg => ({
          ein: replaceBaselayerWithPann(response.data.tin || "N/A"),
          entityName: replaceBaselayerWithPann(reg.name || "N/A"),
          entityAddress: replaceBaselayerWithPann(
            reg.address 
              ? `${reg.address.street || ''}, ${reg.address.city || ''}, ${reg.address.state || ''} ${reg.address.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim() 
              : "N/A"
          ),
          officers: replaceBaselayerWithPann(reg.officers?.map(o => o.name || "Unknown").join(", ") || "N/A")
        })) || [],
      };

      console.log("Transformed Data:", transformedData);
      setReportData(transformedData);
      navigate("/report1");
    } catch (error) {
      if (error.code === "ECONNABORTED" && retries > 0) {
        console.log(`Retry ${3 - retries} due to timeout...`);
        return handleVerify(retries - 1);
      }
      console.error("Detailed Error:", error);
      console.log("Error Code:", error.code);
      console.log("Error Stack:", error.stack);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);
        if (error.response.status === 408 || (error.response.data && error.response.data.state === "FAILED")) {
          setError("No Match, Business not found");
        } else {
          setError(`Server error: ${error.response.data.message || 'Unknown error'} (Status: ${error.response.status})`);
        }
      } else if (error.code === "ECONNABORTED") {
        console.log("Timeout Error: Request took longer than 60 seconds");
        setError("No Match, Business not found");
      } else if (error.request) {
        console.log("Request Error:", error.request);
        setError("No response from server. Please check your connection and try again.");
      } else {
        console.log("Error Message:", error.message);
        setError(`Failed to generate report: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Navigation Menu */}
      <div className="nav-container">
        <div className="logo-container">
          <a href="/">
            <img src="/images/PAAN_Logo.png" alt="Pann Logo" className="nav-logo" />
          </a>
        </div>
        <div className="nav-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">FAQs</a></li>
            <li><a href="/">Why</a></li>
            <li><a href="/">About Us</a></li>
          </ul>
        </div>
        {/* Removed the nav-buttons section */}
      </div>

      {/* Main Content */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Validate your Business Partner in Seconds<br />& Eliminate Fraud and Risk</h1>
          
          <div className="verify-container">
            <div className="form-item">
              <label>Legal Entity Name*</label>
              <div className="input-box">
                <div className="input-icon">
                  <FaBriefcase className="icon" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-item">
              <label>Legal Entity Address*</label>
              <div className="input-box">
                <div className="input-icon">
                  <GoLocation className="icon" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            
            <button className="verify-btn" onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying..." : "Verify Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Partner section */}
      <div className="partners-section">
        <h2>Partnered with Leading Institutions</h2>
        <div className="partner-logos">
          <div className="partner-logo">
            <img src="/images/JP_Morgan.png" alt="JPMorgan Logo" className="partner-logo-img" />
          </div>
          <div className="partner-logo">
            <img src="/images/Techstars.png" alt="Techstars Logo" className="partner-logo-img" />
          </div>
          <div className="partner-logo">
            <img src="/images/t_mobile.png" alt="T-Mobile Logo" className="partner-logo-img" />
          </div>
          <div className="partner-logo">
            <img src="/images/Baselayer.png" alt="Baselayer Logo" className="partner-logo-img" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© Pann Capital Platform, Corporation 2025. All Rights Reserved</p>
      </div>

      {/* Modal for error message */}
      {error && (
        <div className="error-modal-overlay">
          <div className="error-modal">
            <span className="error-text">{error}</span>
            <span className="error-icon" onClick={() => setError("")}>
              <FaTimes />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyForm;