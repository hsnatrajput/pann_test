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
  
  const API_URL = process.env.REACT_APP_API_URL || "https://pann-app-base-edl9t.ondigitalocean.app";

  const handleVerify = async () => {
    if (!legalName || !address) {
      alert("Please enter both Legal Entity Name and Address!");
      return;
    }
  
    setLoading(true);
    try {
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
          }
        }
      );
      
      console.log("API Response:", response.data);

      // Validate response
      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid API response: Expected an object");
      }

      const riskScore = response.data.scores?.find(s => s.type === "risk") || {};
      const kybScore = response.data.scores?.find(s => s.type === "kyb") || {};
      const officers = response.data.business?.business_officers || [];
      const officerNames = officers.map(officer => officer.name || "Unknown").join(", ");

      const transformedData = {
        businessName: response.data.name || legalName,
        businessID: response.data.business?.id || "N/A",
        searchDate: new Date().toLocaleDateString(),
        legalEntityName: legalName,
        legalEntityAddress: address,
        email: response.data.email || "N/A",
        tin: response.data.tin || "N/A",
        officers: officerNames,
        phoneNumber: response.data.phone_number || "N/A",
        website: response.data.website || "N/A",
        riskRating: riskScore.rating || "N/A",
        riskLevel: riskScore.rating === "A" ? "Low Risk" : 
                  riskScore.rating === "B" ? "Medium Risk" : 
                  riskScore.rating === "C" ? "High Risk" : "N/A",
        kybRating: kybScore.rating || "N/A",
        kybLevel: kybScore.rating === "A" ? "Fully Verified" : 
                 kybScore.rating === "B" ? "Partially Verified" : 
                 kybScore.rating === "C" ? "Limited Verification" : "N/A",
        address: response.data.address || "N/A",
        business: response.data.business || {},
        businessOfficers: officers.map(officer => ({
          name: officer.name || "Unknown",
          roles: officer.titles?.join(", ") || "N/A",
          sos_filings: officer.states?.length || officer.titles?.length || 0
        })),
        watchlistHits: response.data.watchlist_hits || [],
        registrations: response.data.business?.registrations || [],
        incorporationDate: response.data.business?.incorporation_date || "N/A",
        incorporationState: response.data.business?.incorporation_state || "N/A",
        businessAge: response.data.business?.months_in_business 
          ? `${Math.floor(response.data.business.months_in_business / 12)} years` 
          : "N/A",
        structure: response.data.business?.structure || "N/A",
        entityType: response.data.business?.structure || "N/A",
        naicsCode: response.data.business?.predicted_naics?.length > 0 
          ? response.data.business.predicted_naics[0] 
          : "N/A",
        status: response.data.business?.registrations?.[0]?.status || "N/A",
        filingStatus: response.data.business?.registrations 
          ? [
              { name: "Active Filings", value: response.data.business.registrations.filter(r => r.status === "active").length, color: "#E47628" },
              { name: "Inactive Filings", value: response.data.business.registrations.filter(r => r.status !== "active").length, color: "#2F4532" },
              { name: "Unknown", value: 0, color: "#F6CBA9" }
            ] 
          : null,
        registeredAgent: response.data.business?.registrations?.[0]?.registered_agent?.name || "N/A",
        registeredAgentAddress: response.data.business?.registrations?.[0]?.registered_agent?.address 
          ? `${response.data.business.registrations[0].registered_agent.address.street || ''}, ${response.data.business.registrations[0].registered_agent.address.city || ''}, ${response.data.business.registrations[0].registered_agent.address.state || ''} ${response.data.business.registrations[0].registered_agent.address.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim()
          : "N/A",
        filingID: response.data.business?.registrations?.[0]?.file_number || "N/A",
        dateFiled: response.data.business?.registrations?.[0]?.issue_date || "N/A",
        addresses: response.data.business?.addresses?.map(addr => 
          `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim()
        ) || [],
        phoneNumbers: response.data.business?.phone_numbers || [],
        socialMedia: response.data.business?.social_profiles?.map(profile => 
          `${profile.site || 'Unknown'}: ${profile.url || 'N/A'}`
        ) || [],
        inquiryVariations: response.data.business?.registrations?.map(reg => ({
          ein: response.data.tin || "N/A",
          entityName: reg.name || "N/A",
          entityAddress: reg.address 
            ? `${reg.address.street || ''}, ${reg.address.city || ''}, ${reg.address.state || ''} ${reg.address.zip || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '').trim() 
            : "N/A",
          officers: reg.officers?.map(o => o.name || "Unknown").join(", ") || "N/A"
        })) || [],
      };

      console.log("Transformed Data:", transformedData);
      setReportData(transformedData);
      navigate("/report1");
    } catch (error) {
      console.error("Detailed Error:", error);
      console.log("Error Stack:", error.stack);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);
        alert(`Server error: ${error.response.data.message || 'Unknown error'} (Status: ${error.response.status})`);
      } else if (error.request) {
        console.log("Request Error:", error.request);
        alert("No response from server. Please check your connection and try again.");
      } else {
        console.log("Error Message:", error.message);
        alert(`Failed to generate report: ${error.message}`);
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