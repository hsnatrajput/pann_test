import React from 'react';
import '../styles/Report4.css';
import Footer from './Footer';

const Report5 = () => {
  return (
    <div className="report-container">
      <div className="header">
        <h2>OAKLAND PRO SOCCER LLC</h2>
        <h1>SOS PANELTIES</h1>
      </div>

      <div className="section" style={{borderRadius:'1.5rem'}}>
        <table className="litigation-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Filled Date</th>
              <th>Effective Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> OAKLAND PRO SOCCER LLC</td>
              <td>07/01/2024</td>
              <td></td>
              <td>General Recovery</td>
            </tr>
            <tr>
              <td>v. Oakland Pro Soccer</td>
              <td>01/02/2024</td>
              <td></td>
              <td>General Recovery</td>
            </tr>
            <tr>
              <td>OAKLAND PRO SOCCER LLC</td>
              <td>01/02/2024</td>
              <td></td>
              <td>Tort - Other</td>
            </tr>
            <tr>
              <td>GEF Logistics Inc</td>
              <td>03/17/2023</td>
              <td></td>
              <td>Washington Western District Court</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer pageNumber={5} />
    </div>
  );
};

export default Report5;







// import React, { useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Report1.css";
// import Footer from "./Footer";
// import Header from './Header';
// import { useNavigate } from "react-router-dom";

// const Report5 = ({ reportData }) => {
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
//             <tr>
//               <td>BUSINESS DETAILS</td>
//               <td>These are the specific details that were entered into the Pann platform to initiate the search for this Business.</td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Associated Addresses</td>
//               <td>{reportData.address || "N/A"}</td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Associated Emails</td>
//               <td>{reportData.email || "N/A"}</td>
//             </tr>
//             <tr className="bg-light">
//               <td className="fw-bold text-muted">Associated Phone Numbers</td>
//               <td>{reportData.phoneNumbers ? reportData.phoneNumbers.join("<br />") : "N/A"}</td>
//             </tr>
//             <tr>
//               <td className="fw-bold text-muted">Associated Social Media Accounts</td>
//               <td>{reportData.socialMedia ? reportData.socialMedia.join("<br />") : "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <hr />
//       <div className="mt-3 mt-md-4">
//         <table className="table table-responsive">
//           <tbody>
//             <tr>
//               <td>INQUIRY VARIATIONS</td>
//               <td></td>
//               <td>Pann ratings can range from A to F for Risk, KYB, and Fraud. Poor scores indicate a greater need for manual review.</td>
//             </tr>
//             <tr className="bg-light">
//               <td>EIN</td>
//               <td>Searched Entity Name</td>
//               <td>Searched Entity Address</td>
//               <td>Searched Business Officers</td>
//             </tr>
//             {reportData.inquiryVariations && reportData.inquiryVariations.length > 0 ? (
//               reportData.inquiryVariations.map((variation, index) => (
//                 <tr key={index} className={index % 2 === 0 ? "" : "bg-light"}>
//                   <td className="fw-bold text-muted">{variation.ein || "N/A"}</td>
//                   <td>{variation.entityName || "N/A"}</td>
//                   <td>{variation.entityAddress || "N/A"}</td>
//                   <td>{variation.officers || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No variations found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <Footer pageNumber={5} />
//     </div>
//   );
// };

// export default Report5;