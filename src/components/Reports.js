import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Report4 from "./Report4";
import Report5 from "./Report5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Reports.css";

const Reports = ({ reportData, hasPaid, setHasPaid }) => {
  const [generating, setGenerating] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const reportContainerRef = useRef(null);

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  const correctPassword = "123456"; // Set your actual password here

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setHasPaid(true);
      setIsPasswordModalOpen(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const generatePDF = async () => {
    if (!reportData || !hasPaid) return;

    setGenerating(true);

    try {
      const downloadButton = document.getElementById("download-pdf-btn");
      const backButton = document.getElementById("back-btn");

      if (downloadButton) downloadButton.style.display = "none";
      if (backButton) backButton.style.display = "none";

      const input = reportContainerRef.current; 

      const canvas = await html2canvas(input, {
        scale: 3,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Business_Verification_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      if (document.getElementById("download-pdf-btn"))
        document.getElementById("download-pdf-btn").style.display = "block";
      if (document.getElementById("back-btn"))
        document.getElementById("back-btn").style.display = "block";

      setGenerating(false);
    }
  };

  if (!reportData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div>
      <div className="container mt-4 mb-4 d-flex justify-content-between">
        <button id="back-btn" className="btn btn-secondary" onClick={() => navigate("/")}>
          ← Back
        </button>
        <button
          id="download-pdf-btn"
          className="btn"
          style={{ backgroundColor: "#FA822C", color: "white" }}
          onClick={generatePDF}
          disabled={!hasPaid || generating}
        >
          {generating ? "Generating PDF..." : "Export as PDF"}
        </button>
      </div>

      {/* Report Container */}
      <div ref={reportContainerRef}>
        <div className="report1-container">
          <div>
            <Report1 reportData={reportData} />
          </div>
        </div>

        {/* Blurred Section for Non-Paid Users */}
        <div
          style={{
            filter: hasPaid ? "none" : "blur(10px)",
            pointerEvents: hasPaid ? "auto" : "none",
            position: "relative",
          }}
        >
          <div><Report2 reportData={reportData} /></div>
          <div><Report3 reportData={reportData} /></div>
          <div><Report4 reportData={reportData} /></div>
          <div><Report5 reportData={reportData} /></div>
        </div>

        {/* Blur Overlay & Unlock Prompt */}
        {!hasPaid && (
          <div className="blur-overlay" onClick={() => setIsPasswordModalOpen(true)}>
            <div className="upgrade-box">
              <span className="upgrade-icon">🔒</span>
              <p className="upgrade-text">Enter password to unlock full report</p>
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="password-modal">
          <div className="password-box">
            <h4>Enter Password</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-2"
              placeholder="Enter password"
            />
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            <div className="mt-3">
              <button className="btn btn-success" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button className="btn btn-danger ms-2" onClick={() => setIsPasswordModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
