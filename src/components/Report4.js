import React from 'react';
import Loan from './LoanComponent/Loan';
import Header from './Header';
import Footer from './Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Report1.css";

function Report4({ reportData }) {
  if (!reportData) return <p>Loading...</p>;

  const businessOfficers = reportData.businessOfficers 
  
  const watchlistHits = reportData.watchlistHits || [];
  const watchlistNames = watchlistHits.map(hit => hit.name || hit.code).filter(Boolean);
  
  return (
    <div className="container p-4 border shadow-sm bg-white">
      <Header />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>Business Officer</td>
              <td>This summary presents all associated Business Officers gathered by Pann for the identified business.</td>
            </tr>
            <tr className="bg-light">
              <td>Address</td>
              <td>Role(s)</td>
              <td>SoS Filings</td>
            </tr>
            {businessOfficers.map((officer, index) => (
              <tr key={index}>
                <td className="fw-bold text-muted">{officer.name}</td>
                <td>{officer.roles }</td>
                <td><span className="badge badge-green">{officer.sos_filings}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>WATCHLISTS</td>
              <td>This summary presents Watchlist hits gathered by Pann on the identified business or its officers.</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">{watchlistNames.length > 0 ? watchlistNames.join(', ') : 'No Watchlist Hits'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>WEBSITE ANALYSIS</td>
              <td>This summary presents all associated Business Officers gathered by Pann for the identified business.</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Business Age</td>
              <td>{reportData.businessAge || "14 years"} <p>Incorporated {reportData.incorporationDate || "2010-08-27"}</p></td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Officers</td>
              <td>{reportData.legalEntityAddress || "8201 Corporate Dr Ste 635, Landover, MD 20785"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <div className="mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>WEBSITE ANALYSIS</td>
              <td>This summary presents website data for the identified business.</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Business Website</td>
              <td>
                {reportData.website || "www.captivasolutions.com"}
                {["Active", "Secure"].map((status, index) => (
                  <span key={index} className="badge badge-green mx-1">{status}</span>
                ))}
              </td>
            </tr>
            <tr className="bg-light">
              <td className="fw-bold text-muted">Business Age</td>
              <td>{reportData.businessAge || "14 years"} <p>Incorporated {reportData.incorporationDate || "2010-08-27"}</p></td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Domain Age</td>
              <td>10 years <p>Created 2015-03-15</p></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Loan />
      </div>

      <Footer pageNumber={4} />
    </div>
  );
}

export default Report4;