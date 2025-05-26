import React from 'react';
import '../styles/Report3.css';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

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

  const liens = reportData.business?.liens || [];

  return (
    <div className="report-container">
      <div className="header">
        <h2>{reportData.legalEntityName || "N/A"}</h2>
        <h1>WATCHLISTS</h1>
        <h3>DEPARTMENT OF TREASURY, OFFICE OF FOREIGN ASSETS CONTROL</h3>
        <div className="status-box">
          <span>OFAC: </span>
          <span className="status-green" style={{ backgroundColor: '#9ACD32', padding: '0.3rem', borderRadius: '0.5rem' }}>
            {reportData.watchlistHits.some(hit => hit.count > 0) ? "Hits Found" : "No Hits"}
          </span>
        </div>
      </div>
      <h3>LIENS</h3>
      <div className="section">
        <div className="details-box">
          {liens.length > 0 && liens.map((lien, index) => (
            <div key={index} className="details-row">
              <span className="label">Status</span>
              <span className="value status-green">{lien.status || "N/A"}</span>
              <span className="label">Lien</span>
              <span className="value">{lien.type || "N/A"}</span>
              <span className="label">Filed Date</span>
              <span className="value">{lien.filed_date || "N/A"}</span>
              <span className="label">Lapse Date</span>
              <span className="value">{lien.lapse_date || "N/A"}</span>
              <span className="label">State</span>
              <span className="value">{lien.state || "N/A"}</span>
              <span className="label">Debtors</span>
              <div className="value-list">
                <span>{reportData.legalEntityName || "N/A"}</span>
                <span>{reportData.legalEntityAddress || "N/A"}</span>
              </div>
              <span className="label">Secured Party</span>
              <div className="value-list">
                <span>{lien.secured_party_name || "N/A"}</span>
                <span>{lien.secured_party_address || "N/A"}</span>
              </div>
              <span className="label">Amendments</span>
              <span className="value">{lien.amendments || "N/A"}</span>
              <span className="label">Filing Date</span>
              <span className="value">{lien.filing_date || "N/A"}</span>
            </div>
          ))}
          {liens.length === 0 && <p>No liens found</p>}
        </div>
      </div>

      <Footer pageNumber={3} />
    </div>
  );
};

export default Report3;









// import React, { useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Report1.css";
// import Footer from "./Footer";
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";

// const Report3 = ({ reportData }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!reportData) {
//       navigate("/"); 
//     }
//   }, [reportData, navigate]);

//   if (!reportData) {
//     return <h2 className="text-center mt-5">Loading Report...</h2>;
//   }

//   return (
//     <div className="container p-3 p-md-4 border shadow-sm bg-white">
//       <Header />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">
//                 Address
//                 <p>Address Type</p>
//               </td>
//               <td>
//                 {reportData.address || "N/A"} <br />
//                 <span className="badge badge-green">Commercial</span> | <span className="badge badge-green">Deliverable</span>
//               </td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">
//                 Registered Agent
//                 <p>Registered Agent Address</p>
//               </td>
//               <td>
//                 {reportData.registeredAgent || "N/A"}
//                 <p>{reportData.registeredAgentAddress || "N/A"}</p>
//               </td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Officers</td>
//               <td>{reportData.officers || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <hr />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">District of Columbia</td>
//               <td>
//                 Filing ID | {reportData.filingID || "N/A"}
//                 <span className="badge badge-green ms-2">Foreign</span>
//                 <span className="badge badge-green ms-2">Active | Revived</span>
//               </td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Business Name</td>
//               <td>{reportData.businessName || "N/A"}</td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Date Filed</td>
//               <td>{reportData.dateFiled || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <hr />

//       <table className="table table-responsive">
//         <tbody>
//           <tr>
//             <td>Address</td>
//             <td>
//               This summary presents all associated addresses gathered by <br />
//               Pann for the identified business.
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <thead>
//             <tr>
//               <th>Address</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(reportData.addresses || []).map((address, index) => (
//               <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
//                 <td className="fw-bold text-muted">{address}</td>
//                 <td>
//                   <span className="badge badge-green">Commercial</span>
//                   <span className="badge badge-green ms-2">Deliverable</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Footer pageNumber={3} />
//     </div>
//   );
// };

// export default Report3;