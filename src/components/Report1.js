import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Report1.css";
import Footer from "./Footer";
import CircularChart from "./CircularChart";
import { useNavigate } from "react-router-dom";

const Report1 = ({ reportData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportData) {
      navigate("/"); 
    }
  }, [reportData, navigate]);

  if (!reportData) {
    return <h2 className="text-center mt-5">Loading Report...</h2>;
  }

  return (
    <div className="container p-4 border shadow-sm bg-white">
      <div className="p-4 rounded">
        <div className="text-center pann-box">
          <img src="/images/Pann_logo.png" alt="Pann Logo" className="pann-logo" />
          <p className="business-report">Business Report</p>
        </div>

        <div className="p-3 text-white rounded" style={{ backgroundColor: "#FA822C" }}>
          <h4>{reportData.businessName }</h4>
          <p className="mb-0">Business ID: {reportData.businessID || "N/A"}</p>
          <p className="mb-0">Searched: {reportData.searchDate || "N/A"}</p>
        </div>
      </div>

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>APPLICATION DETAILS</td>
              <td>Details entered into the Pann platform to verify this business.</td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Legal Entity Name</td>
              <td>{reportData.legalEntityName }</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Legal Entity Address</td>
              <td>{reportData.legalEntityAddress }</td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Email</td>
              <td>{reportData.email }</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">TIN</td>
              <td>{reportData.tin || "-"}</td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Business Officer(s)</td>
              <td>{reportData.officers || "-"}</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Phone Number</td>
              <td>{reportData.phoneNumber || "N/A"}</td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Website</td>
              <td>{reportData.website || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <div className="mt-4 ">
      <div className="rating-container">
        <div className="rating-text">
          <div className="rating-section">
            <h6 className="fw-bold">Risk Rating</h6>
            <h2 className="rating-grade">{reportData.riskRating || "N/A"}</h2>
            <p className="rating-subtext">{reportData.riskLevel || "N/A"}</p>
          </div>
          <div className="rating-section">
            <h6 className="fw-bold">KYB Rating</h6>
            <h2 className="rating-grade">{reportData.kybRating || "N/A"}</h2>
            <p className="rating-subtext">{reportData.kybLevel || "N/A"}</p>
          </div>
        </div>
        <CircularChart riskRating={reportData.riskRating} />
      </div>
      </div>

      <Footer pageNumber={1} />

    </div>
  );
};

export default Report1;
