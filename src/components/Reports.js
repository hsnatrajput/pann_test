import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Report4 from "./Report4";
import Report5 from "./Report5";
import PricingModal from "./PricingModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Reports.css";

const Reports = ({ reportData }) => {
  const [generating, setGenerating] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!reportData || !hasPaid) return;
    
    setGenerating(true);
    const pdf = new jsPDF("p", "mm", "a4");

    try {
      for (const [index, key] of Object.keys(reportRefs).entries()) {
        const input = reportRefs[key].current;

        if (input) {
          const canvas = await html2canvas(input, { 
            scale: 2,
            logging: false,
            useCORS: true 
          });
          
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (index !== 0) pdf.addPage(); 
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }
      }

      pdf.save("Business_Verification_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
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
          className="btn btn-secondary" 
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
        <button 
          className="btn" 
          style={{ backgroundColor: "#FA822C", color: "white" }}
          onClick={generatePDF}
          disabled={!hasPaid || generating}
        >
          {generating ? "Generating PDF..." : "Export as PDF"}
        </button>
      </div>

      <div className="report1-container">
        <div ref={reportRefs.report1}>
          <Report1 reportData={reportData} />
        </div>
        {!hasPaid && (
          <div className="blur-overlay-report1">
            <p className="upgrade-text" onClick={() => setIsModalOpen(true)}>Upgrade your plan to unlock full report</p>
          </div>
        )}
      </div>

      <div style={{ 
        filter: hasPaid ? "none" : "blur(10px)", 
        pointerEvents: hasPaid ? "auto" : "none", 
        position: "relative" 
      }}>
        <div ref={reportRefs.report2}><Report2 reportData={reportData} /></div>
        <div ref={reportRefs.report3}><Report3 reportData={reportData} /></div>
        <div ref={reportRefs.report4}><Report4 reportData={reportData} /></div>
        <div ref={reportRefs.report5}><Report5 reportData={reportData} /></div>
      </div>

      
      
      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPaymentSuccess={() => setHasPaid(true)}
      />
    </div>
  );
};

export default Reports;
