import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Report4 from "./Report4";
import Report5 from "./Report5";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Reports.css";

const Reports = ({ reportData }) => {
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const reportRefs = {
    report1: useRef(),
    report2: useRef(),
    report3: useRef(),
    report4: useRef(),
    report5: useRef(),
  };

  React.useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  const generatePDF = async () => {
    if (!reportData) return;
    
    setGenerating(true);
  
    try {
     
      const downloadButton = document.getElementById("download-pdf-btn");
      const backButton = document.getElementById("back-btn");
  
     
      if (downloadButton) downloadButton.style.display = "none";
      if (backButton) backButton.style.display = "none";
  
      const input = document.body; 
  
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
        <button 
          id="back-btn" 
          className="btn btn-secondary" 
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
        <button 
          id="download-pdf-btn"  
          className="btn" 
          style={{ backgroundColor: "#FA822C", color: "white" }}
          onClick={generatePDF}
          disabled={generating}
        >
          {generating ? "Generating PDF..." : "Export as PDF"}
        </button>
      </div>

      <div>
        <div ref={reportRefs.report1}><Report1 reportData={reportData} /></div>
        <div ref={reportRefs.report2}><Report2 reportData={reportData} /></div>
        <div ref={reportRefs.report3}><Report3 reportData={reportData} /></div>
        <div ref={reportRefs.report4}><Report4 reportData={reportData} /></div>
        <div ref={reportRefs.report5}><Report5 reportData={reportData} /></div>
      </div>
    </div>
  );
};

export default Reports;
