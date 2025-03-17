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

  const compressCanvasImage = (canvas, quality = 0.9) => {
    // Create a new canvas with slightly reduced dimensions
    const scaleFactor = 0.85; // Only reduces dimensions by 15%
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width * scaleFactor;
    newCanvas.height = canvas.height * scaleFactor;
    
    // Draw original canvas content onto the new smaller canvas
    const ctx = newCanvas.getContext('2d');
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newCanvas.width, newCanvas.height);
    
    // Return compressed JPEG image data with higher quality
    return newCanvas.toDataURL('image/jpeg', quality);
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

        // Convert the report to canvas with higher scale for better quality
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better initial quality
          useCORS: true,
          logging: false,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
          imageTimeout: 0, // No timeout for images
          removeContainer: false
        });

        // Compress the canvas image with higher quality
        const imgData = compressCanvasImage(canvas, 0.92);
        
        // Calculate PDF dimensions based on original canvas size
        // Convert from pixels to mm (assuming 96 DPI)
        const pdfWidth = (canvas.width / 96) * 25.4;
        const pdfHeight = (canvas.height / 96) * 25.4;
        
        // If first page, create PDF with dimensions of first report
        if (i === 0) {
          pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
            unit: "mm",
            format: [pdfWidth, pdfHeight],
            compress: true,
            putOnlyUsedFonts: true
          });
          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'SLOW');
        } else {
          // For subsequent pages, add a new page with dimensions of current report
          pdf.addPage([pdfWidth, pdfHeight], pdfWidth > pdfHeight ? "landscape" : "portrait");
          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'SLOW');
        }
      }

      // Save the PDF with optimized settings
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