import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Report1.css";
import "../styles/Report2.css";
import Footer from "./Footer";
import Ratings from "./Ratings";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Report2 = ({ reportData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  if (!reportData) {
    return <h2 className="text-center mt-5">Loading Report...</h2>;
  }

  const businessDetails = [
    { label: "Legal Entity Name", value: reportData.legalEntityName || "N/A" },
    { label: "Entity Type", value: reportData.entityType || "N/A" },
    { label: "TIN", value: reportData.tin || "N/A" },
    { label: "Legal Entity Address", value: reportData.legalEntityAddress || "N/A" },
    { label: "Incorporation State", value: reportData.incorporationState || "N/A", badge: reportData.status },
    { label: "Incorporation Date", value: reportData.incorporationDate || "N/A" },
    { label: "Phone Number", value: reportData.phoneNumber || "N/A" },
    { label: "Website", value: reportData.website || "N/A" },
    { label: "NAICS Code (Industry)", value: reportData.naicsCode || "N/A" },
  ];

  const ratingsData = reportData.filingStatus || [
    { name: "Active Filings", value: 156, color: "#E47628" },
    { name: "Inactive Filings", value: 60, color: "#2F4532" },
    { name: "Unknown", value: 30, color: "#F6CBA9" },
  ];

  return (
    <div className="container p-4 border shadow-sm bg-white">
      <Header />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>BUSINESS DETAILS</td>
              <td>These are the specific details that were entered into the Baselayer platform to initiate the search for this Business.</td>
            </tr>
            {businessDetails.map((item, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-light" : ""}>
                <td className="fw-bold text-muted">{item.label}</td>
                <td>
                  {item.value} {item.badge && <span className="badge badge-green">{item.badge}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div className="ratings-container">
        <Ratings ratingsData={ratingsData} />
      </div>

      <Footer pageNumber={2} />
    </div>
  );
};

export default Report2;
