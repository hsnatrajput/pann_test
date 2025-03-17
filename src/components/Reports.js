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
  const reportRefs = {
    report1: useRef(null),
    report2: useRef(null),
    report3: useRef(null),
    report4: useRef(null),
    report5: useRef(null)
  };
  const reportContainerRef = useRef(null);

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  const correctPassword = "123456"; 

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

      // Get report elements
      const reportElements = [
        reportRefs.report1.current,
        reportRefs.report2.current,
        reportRefs.report3.current,
        reportRefs.report4.current,
        reportRefs.report5.current
      ];

      let pdf = null;
      
      // Process each report element
      for (let i = 0; i < reportElements.length; i++) {
        const element = reportElements[i];
        if (!element) continue;

        // Convert the report to canvas
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
        });

        const imgData = canvas.toDataURL("image/png");
        
        // Calculate PDF dimensions based on canvas size
        // Convert from pixels to mm (assuming 96 DPI)
        const pdfWidth = (canvas.width / 96) * 25.4;
        const pdfHeight = (canvas.height / 96) * 25.4;
        
        // If first page, create PDF with dimensions of first report
        if (i === 0) {
          pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
            unit: "mm",
            format: [pdfWidth, pdfHeight]
          });
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        } else {
          // For subsequent pages, add a new page with dimensions of current report
          pdf.addPage([pdfWidth, pdfHeight], pdfWidth > pdfHeight ? "landscape" : "portrait");
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }
      }

      // Save the PDF
      if (pdf) {
        pdf.save("Business_Verification_Report.pdf");
      }
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

      <div ref={reportContainerRef}>
        <div className="report1-container" ref={reportRefs.report1}>
          <Report1 reportData={reportData} />
        </div>

        <div
          style={{
            filter: hasPaid ? "none" : "blur(10px)",
            pointerEvents: hasPaid ? "auto" : "none",
            position: "relative",
          }}
        >
          <div ref={reportRefs.report2}><Report2 reportData={reportData} /></div>
          <div ref={reportRefs.report3}><Report3 reportData={reportData} /></div>
          <div ref={reportRefs.report4}><Report4 reportData={reportData} /></div>
          <div ref={reportRefs.report5}><Report5 reportData={reportData} /></div>
        </div>

        {!hasPaid && (
          <div className="blur-overlay" onClick={() => setIsPasswordModalOpen(true)}>
            <div className="upgrade-box">
              <span className="upgrade-icon">🔒</span>
              <p className="upgrade-text">Enter password to unlock full report</p>
            </div>
          </div>
        )}
      </div>

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