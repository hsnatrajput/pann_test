import React from 'react';
import '../styles/Report4.css';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Report4 = ({ reportData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  if (!reportData) {
    return <h2 className="text-center mt-5">Loading Report...</h2>;
  }

  const litigations = reportData.business?.litigations || [];
  const bankruptcyCount = reportData.business?.bankruptcies?.length || 0;

  return (
    <div className="report-container">
      <div className="header">
        <h2 style={{ marginBottom: '1rem' }}>{reportData.legalEntityName || "N/A"}</h2>
        <h1>LITIGATION & BANKRUPTCIES</h1>
      </div>

      <div className="section" style={{ borderRadius: '1.5rem' }}>
        <h3 className="note">{litigations.length} HITS* ON RECORD</h3>
        <p className="note">Out of {litigations.length} hits {litigations.filter(l => l.type === "trademark").length} were recognized as trademarks*</p>
        <table className="litigation-table">
          <thead>
            <tr>
              <th>Filing Date</th>
              <th>Litigation</th>
              <th>Court</th>
              <th>Case Type</th>
            </tr>
          </thead>
          <tbody>
            {litigations.map((litigation, index) => (
              <tr key={index}>
                <td>{litigation.filing_date || "N/A"}</td>
                <td>{litigation.case_name || "N/A"}</td>
                <td>{litigation.court || "N/A"}</td>
                <td>{litigation.type || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>BANKRUPTCIES</h1>
      <p>{bankruptcyCount > 0 ? `${bankruptcyCount} Bankruptcy${bankruptcyCount > 1 ? 'ies' : ''} Found` : "NO BANKRUPTCIES FOUND"}</p>

      <Footer pageNumber={4} />
    </div>
  );
};

export default Report4;






// import React from "react";
// import Loan from "./LoanComponent/Loan";
// import Header from "./Header";
// import Footer from "./Footer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Report1.css";

// function Report4({ reportData }) {
//   if (!reportData) return <p>Loading...</p>;

//   const businessOfficers = reportData.businessOfficers || [];
//   const watchlistHits = reportData.watchlistHits || [];
//   const watchlistNames = watchlistHits.map(hit => hit.name || hit.code).filter(Boolean);

//   return (
//     <div className="container p-3 p-md-4 border shadow-sm bg-white">
//       <Header />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr>
//               <td>Business Officer</td>
//               <td>This summary presents all associated Business Officers gathered by Pann for the identified business.</td>
//             </tr>
//             <tr className="bg-light">
//               <td>Address</td>
//               <td>Role(s)</td>
//               <td>SoS Filings</td>
//             </tr>
//             {businessOfficers.map((officer, index) => (
//               <tr key={index}>
//                 <td className="fw-bold text-muted">{officer.name}</td>
//                 <td>{officer.roles}</td>
//                 <td><span className="badge badge-green">{officer.sos_filings}</span></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <hr />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr>
//               <td>WATCHLISTS</td>
//               <td>This summary presents Watchlist hits gathered by Pann on the identified business or its officers.</td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">{watchlistNames.length > 0 ? watchlistNames.join(', ') : 'No Watchlist Hits'}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <hr />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr>
//               <td>WEBSITE ANALYSIS</td>
//               <td>This summary presents all associated Business Officers gathered by Pann for the identified business.</td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Business Age</td>
//               <td>{reportData.businessAge || "14 years"} <p>Incorporated {reportData.incorporationDate || "2010-08-27"}</p></td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Officers</td>
//               <td>{reportData.legalEntityAddress || "8201 Corporate Dr Ste 635, Landover, MD 20785"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <hr />

//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr>
//               <td>WEBSITE ANALYSIS</td>
//               <td>This summary presents website data for the identified business.</td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Business Website</td>
//               <td>
//                 {reportData.website || "www.captivasolutions.com"}
//                 {["Active", "Secure"].map((status, index) => (
//                   <span key={index} className="badge badge-green mx-1">{status}</span>
//                 ))}
//               </td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Business Age</td>
//               <td>{reportData.businessAge || "14 years"} <p>Incorporated {reportData.incorporationDate || "2010-08-27"}</p></td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Domain Age</td>
//               <td>10 years <p>Created 2015-03-15</p></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-3 mt-md-4">
//         <Loan />
//       </div>

//       <Footer pageNumber={4} />
//     </div>
//   );
// }

// export default Report4;