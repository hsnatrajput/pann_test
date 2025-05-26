import React from 'react';
import '../styles/Report1.css';
import Footer from './Footer';
import '../styles/Footer.css'

const Report1 = () => {
  return (
    <div className="report-container">
      <div className="footer-container mb-5">
      <div className="footer-left">
        <img src="/images/Pann_logo.png" alt="Pann Logo" className="footer-logo" />
      </div>
      <div className="footer-right">
        <p className="report-date">Report generated on May 23, 2025 04:44 PM PKT</p>
      </div>
    </div>
      <div className="header">
        <h1>OAKLAND PRO SOCCER LLC</h1>
        <div className="rating-section">
          <div className="rating-left">
            <h3 style={{fontWeight:'bold'}}>KYB RATING</h3>
            <div className="rating-row">
              <div className="rating-circle">
                <span>84%</span>
              </div>
              <div className="rating-letter-box">
                <p className="rating-letter">B</p>
                <p className="rating-label">Rating</p>
              </div>
            </div>
            <div className="status-bar">
              <div className="bar red"></div>
              <span>EXISTING LITIGATIONS</span>
            </div>
            <div className="status-bar">
              <div className="bar red"></div>
              <span>LIEN ACTIVITY</span>
            </div>
            <div className="status-bar">
              <div className="bar yellow"></div>
              <span>STATEMENT OF INFORMATION PENALTIES</span>
            </div>
          </div>
          <div className="rating-right">
            <h3 style={{ fontWeight: 'bold' , marginBottom:'1rem' }}>BUSINESS SNAPSHOT</h3>
            <div className="snapshot-row">
              <span className="snapshot-label">Incorporation Date</span>
              <span className="snapshot-value">July 11</span>
            </div>
            <div className="snapshot-row">
              <span className="snapshot-label">SOS Entity Number</span>
              <span className="snapshot-value">201819410136</span>
            </div>
            <div className="snapshot-row">
              <span className="snapshot-label">Secretary of State</span>
              <span className="snapshot-value">
                <span className="active-badge">Active</span>
              </span>
            </div>
            <div className="snapshot-row">
              <span className="snapshot-label">Franchise Tax Board</span>
              <span className="snapshot-value">
                <span className="active-badge">Active</span>
              </span>
            </div>
            <div className="snapshot-row">
              <span className="snapshot-label">Agent</span>
              <span className="snapshot-value">
                <span className="active-badge">Active</span>
              </span>
            </div>
            <div className="snapshot-row">
              <span className="snapshot-label">Victims of Corporate Fraud Compensation Fund</span>
              <span className="snapshot-value">
                <span className="active-badge">Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="details-table">
          <div className="details-row" style={{backgroundColor:'#F0F8FF'}}>
            <span className="label">Company Name</span>
            <span className="value">Oakland Pro Soccer LLC</span>
          </div>
          <div className="details-row">
            <span className="label">Entity Type</span>
            <span className="value">Limited Liability Company</span>
          </div>
          <div className="details-row">
            <span className="label">Legal Entity Address</span>
            <span className="value">2744 E 11th St Unit K01, Oakland, CA 94601</span>
          </div>
          <div className="details-row">
            <span className="label">Website</span>
            <span className="value">https://www.oaklandrootssc.com/</span>
          </div>
          <div className="details-row">
            <span className="label">Incorporation Date</span>
            <span className="value">July 11, 2018</span>
          </div>
          <div className="details-row">
            <span className="label">Company Age</span>
            <span className="value">6 Years 10 Months</span>
          </div>
          <div className="details-row">
            <span className="label">Agent</span>
            <span className="value">Steven Aldrich</span>
          </div>
          <div className="details-row">
            <span className="label">Status</span>
            <span className="value">Active</span>
          </div>
          <div className="details-row">
            <span className="label">State</span>
            <span className="value">CA</span>
          </div>
          <div className="details-row">
            <span className="label">Formed In</span>
            <span className="value">California</span>
          </div>
          <div className="details-row">
            <span className="label">Statement of Info Due Date</span>
            <span className="value">07/31/2026</span>
          </div>
          <div className="details-row">
            <span className="label">B Corporation</span>
            <span className="value">No</span>
          </div>
        </div>
      </div>
      <Footer pageNumber={1} />
    </div>
  );
};

export default Report1;




// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Report1.css";
// import Footer from "./Footer";

// const Report1 = () => {
//   return (
//     <div className="container p-3 p-md-4 border shadow-sm bg-white">
//       <div className="text-center">
//         <h1>OAKLAND PRO SOCCER LLC</h1>
//       </div>

//       <div className="row mt-4">
//         <div className="col-6">
//           <div className="kyb-rating p-3 rounded">
//             <div className="rating-header">
//               <h6>KYB Rating</h6>
//               <span className="rating-grade">B</span>
//             </div>
//             <div className="rating-box">
//               <span className="rating-value">84%</span>
//               <div className="rating-indicators">
//                 <div className="indicator">
//                   <span className="indicator-label">EXISTING LITIGATIONS</span>
//                   <div className="indicator-bar existing-litigations"></div>
//                 </div>
//                 <div className="indicator">
//                   <span className="indicator-label">LIEN ACTIVITY</span>
//                   <div className="indicator-bar lien-activity"></div>
//                 </div>
//                 <div className="indicator">
//                   <span className="indicator-label">STATEMENT OF INFO PENALTIES</span>
//                   <div className="indicator-bar statement-of-info-penalties"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-6">
//           <div className="business-snapshot p-3 rounded">
//             <h6>BUSINESS SNAPSHOT</h6>
//             <table className="snapshot-table">
//               <tr>
//                 <td>Incorporation Date</td>
//                 <td>July 11, 2018</td>
//               </tr>
//               <tr>
//                 <td>SOS Entity Number</td>
//                 <td>201819410136</td>
//               </tr>
//               <tr>
//                 <td>Secretary of State</td>
//                 <td><span className="status active">Active</span></td>
//               </tr>
//               <tr>
//                 <td>Franchise Tax Board</td>
//                 <td><span className="status active">Active</span></td>
//               </tr>
//               <tr>
//                 <td>Victims of Corporate Fraud Compensation Fund</td>
//                 <td><span className="status active">Active</span></td>
//               </tr>
//             </table>
//           </div>
//         </div>
//       </div>

//       <hr />

//       <div className="mt-4">
//         <table className="table-bordered custom-table">
//           <tbody>
//             <tr className="table-header">
//               <td>Company Name</td>
//               <td>Oakland Pro Soccer LLC</td>
//             </tr>
//             <tr>
//               <td>Entity type</td>
//               <td>Limited Liability Company</td>
//             </tr>
//             <tr>
//               <td>Legal Entity Address</td>
//               <td>2744 E 11th St Unit KOL, Oakland, CA 94601</td>
//             </tr>
//             <tr>
//               <td>Website</td>
//               <td>https://www.oaklandrootscc.com/</td>
//             </tr>
//             <tr>
//               <td>Incorporation Date</td>
//               <td>July 11, 2018</td>
//             </tr>
//             <tr>
//               <td>Company Age</td>
//               <td>6 Years 10 Months</td>
//             </tr>
//             <tr>
//               <td>Agent</td>
//               <td>Steven Aldrich</td>
//             </tr>
//             <tr>
//               <td>Status</td>
//               <td>Active</td>
//             </tr>
//             <tr>
//               <td>Formed in</td>
//               <td>California</td>
//             </tr>
//             <tr>
//               <td>Statement of Info Due Date</td>
//               <td>07/31/2026</td>
//             </tr>
//             <tr>
//               <td>B Corporation</td>
//               <td>No</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <Footer pageNumber={1} />
//     </div>
//   );
// };

// export default Report1;