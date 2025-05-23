import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Report4 from "./Report4";
import Report5 from "./Report5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Reports.css";

const Reports = ({ reportData, hasPaid }) => {
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which report to show based on the route
  const reportToShow = location.pathname.includes("report1") ? "report1" : "report1"; // Default to report1 for now
  
  const reportRefs = {
    report1: useRef(null),
    report2: useRef(null),
    report3: useRef(null),
    report4: useRef(null),
    report5: useRef(null)
  };

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  const compressCanvasImage = (canvas, quality = 0.9) => {
    const scaleFactor = 0.85;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width * scaleFactor;
    newCanvas.height = canvas.height * scaleFactor;
    const ctx = newCanvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newCanvas.width, newCanvas.height);
    return newCanvas.toDataURL("image/jpeg", quality);
  };

  const generatePDF = async () => {
    if (!reportData || !hasPaid) return;

    setGenerating(true);

    try {
      const downloadButton = document.getElementById("download-pdf-btn");
      const backButton = document.getElementById("back-btn");

      if (downloadButton) downloadButton.style.display = "none";
      if (backButton) backButton.style.display = "none";

      // Only generate PDF for the selected report
      const element = reportRefs[reportToShow].current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        imageTimeout: 0,
        removeContainer: false
      });

      const imgData = compressCanvasImage(canvas, 0.92);
      const pdfWidth = (canvas.width / 96) * 25.4;
      const pdfHeight = (canvas.height / 96) * 25.4;

      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
        compress: true,
        putOnlyUsedFonts: true
      });

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "SLOW");
      const safeName = reportData.legalEntityName?.replace(/[^a-z0-9]/gi, "_") || "Business_Report";
      pdf.save(`${safeName}_report.pdf`);
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

      <div>
        {/* Conditionally render only the selected report */}
        {reportToShow === "report1" && (
          <div className="report1-container" ref={reportRefs.report1}>
            <Report1 reportData={reportData} />
          </div>
        )}
        {reportToShow === "report2" && (
          <div ref={reportRefs.report2}>
            <Report2 reportData={reportData} />
          </div>
        )}
        {reportToShow === "report3" && (
          <div ref={reportRefs.report3}>
            <Report3 reportData={reportData} />
          </div>
        )}
        {reportToShow === "report4" && (
          <div ref={reportRefs.report4}>
            <Report4 reportData={reportData} />
          </div>
        )}
        {reportToShow === "report5" && (
          <div ref={reportRefs.report5}>
            <Report5 reportData={reportData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;