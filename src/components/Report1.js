import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Report1.css";
import Footer from "./Footer";

const Report1 = () => {
  return (
    <div className="container p-3 p-md-4 border shadow-sm bg-white">
      <div className="text-center">
        <h1>OAKLAND PRO SOCCER LLC</h1>
      </div>

      <div className="row mt-4">
        <div className="col-6">
          <div className="kyb-rating p-3 rounded">
            <div className="rating-header">
              <h6>KYB Rating</h6>
              <span className="rating-grade">B</span>
            </div>
            <div className="rating-box">
              <span className="rating-value">84%</span>
              <div className="rating-indicators">
                <div className="indicator">
                  <span className="indicator-label">EXISTING LITIGATIONS</span>
                  <div className="indicator-bar existing-litigations"></div>
                </div>
                <div className="indicator">
                  <span className="indicator-label">LIEN ACTIVITY</span>
                  <div className="indicator-bar lien-activity"></div>
                </div>
                <div className="indicator">
                  <span className="indicator-label">STATEMENT OF INFO PENALTIES</span>
                  <div className="indicator-bar statement-of-info-penalties"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="business-snapshot p-3 rounded">
            <h6>BUSINESS SNAPSHOT</h6>
            <table className="snapshot-table">
              <tr>
                <td>Incorporation Date</td>
                <td>July 11, 2018</td>
              </tr>
              <tr>
                <td>SOS Entity Number</td>
                <td>201819410136</td>
              </tr>
              <tr>
                <td>Secretary of State</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Franchise Tax Board</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Victims of Corporate Fraud Compensation Fund</td>
                <td><span className="status active">Active</span></td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-4">
        <table className="table-bordered custom-table">
          <tbody>
            <tr className="table-header">
              <td>Company Name</td>
              <td>Oakland Pro Soccer LLC</td>
            </tr>
            <tr>
              <td>Entity type</td>
              <td>Limited Liability Company</td>
            </tr>
            <tr>
              <td>Legal Entity Address</td>
              <td>2744 E 11th St Unit KOL, Oakland, CA 94601</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>https://www.oaklandrootscc.com/</td>
            </tr>
            <tr>
              <td>Incorporation Date</td>
              <td>July 11, 2018</td>
            </tr>
            <tr>
              <td>Company Age</td>
              <td>6 Years 10 Months</td>
            </tr>
            <tr>
              <td>Agent</td>
              <td>Steven Aldrich</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Formed in</td>
              <td>California</td>
            </tr>
            <tr>
              <td>Statement of Info Due Date</td>
              <td>07/31/2026</td>
            </tr>
            <tr>
              <td>B Corporation</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer pageNumber={1} />
    </div>
  );
};

export default Report1;