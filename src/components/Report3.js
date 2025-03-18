import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Report1.css";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Report3 = ({ reportData }) => {
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
      <Header />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr className="bg-light">
              <td className="fw-bold text-muted">
                Address
                <p>Address Type</p>
              </td>
              <td>
                {reportData.address || "N/A"} <br />
                <span className="badge badge-green">Commercial</span> | <span className="badge badge-green">Deliverable</span>
              </td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">
                Registered Agent
                <p>Registered Agent Address</p>
              </td>
              <td>
                {reportData.registeredAgent || "N/A"}
                <p>{reportData.registeredAgentAddress || "N/A"}</p>
              </td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Officers</td>
              <td>{reportData.officers || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr className="bg-light">
              <td className="fw-bold text-muted">District of Columbia</td>
              <td>
                Filing ID | {reportData.filingID || "N/A"}
                <span className="badge badge-green ms-2">Foreign</span>
                <span className="badge badge-green ms-2">Active | Revived</span>
              </td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Business Name</td>
              <td>{reportData.businessName || "N/A"}</td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Date Filed</td>
              <td>{reportData.dateFiled || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <table className="table">
        <tbody>
          <tr>
            <td>Address</td>
            <td>
              This summary presents all associated addresses gathered by <br />
              Pann for the identified business.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {(reportData.addresses || []).map((address, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                <td className="fw-bold text-muted">{address}</td>
                <td>
                  <span className="badge badge-green">Commercial</span>
                  <span className="badge badge-green ms-2">Deliverable</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer pageNumber={3} />
    </div>
  );
};

export default Report3;
