import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Report4 from "./Report4";
import Report5 from "./Report5";
import Report6 from "./Report6";
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
  const paginatedContentRef = useRef(null);

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  const correctPassword = "pann00@@";

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setHasPaid(true);
      setIsPasswordModalOpen(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const createPaginatedContent = () => {
    const reports = [
      { component: Report1, data: reportData },
      { component: Report2, data: reportData },
      { component: Report3, data: reportData },
      { component: Report4, data: reportData },
      { component: Report5, data: reportData },
      { component: Report6, data: reportData }
    ];
  
    return reports.map((report, index) => {
      const ReportComponent = report.component;
      return (
        <div key={index} className={`report-section ${index !== 0 && !hasPaid ? 'blurred' : ''}`}>
          <ReportComponent reportData={report.data} hasPaid={hasPaid} />
        </div>
      );
    });
  };

  const generatePDF = async () => {
    if (!reportData || !hasPaid) {
      setIsPasswordModalOpen(true);
      return;
    }

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    };

    setGenerating(true);

    try {
      const downloadButton = document.getElementById("download-pdf-btn");
      const backButton = document.getElementById("back-btn");
      if (downloadButton) downloadButton.style.display = "none";
      if (backButton) backButton.style.display = "none";
      await preloadImage('/images/Pann_logo.png');

      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(tempContainer);

      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;
      const MARGIN_MM = 20;
      const FOOTER_HEIGHT_MM = 15;
      const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - (2 * MARGIN_MM) - FOOTER_HEIGHT_MM;
      const PX_PER_MM = 3.78;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const reports = [
        { component: Report1, data: reportData },
        { component: Report2, data: reportData },
        { component: Report3, data: reportData },
        { component: Report4, data: reportData },
        { component: Report5, data: reportData },
        { component: Report6, data: reportData }
      ];

      let currentPageContent = '';
      let currentHeightPx = 0;
      let pageNumber = 1;
      let isFirstPage = true;
      const pages = [];

      for (const report of reports) {
        const reportHTML = await renderReportToHTML(report.component, report.data);

        const measureDiv = document.createElement('div');
        measureDiv.style.width = `${A4_WIDTH_MM - 2 * MARGIN_MM}mm`;
        measureDiv.style.padding = '0';
        measureDiv.style.fontFamily = 'Arial, sans-serif';
        measureDiv.style.fontSize = '12px';
        measureDiv.style.lineHeight = '1.4';
        measureDiv.style.visibility = 'hidden';
        measureDiv.innerHTML = reportHTML;
        tempContainer.appendChild(measureDiv);

        const heightPx = measureDiv.offsetHeight;
        const heightMm = heightPx / PX_PER_MM;
        let modifiedReportHTML = reportHTML;

        if (currentHeightPx + heightPx > CONTENT_HEIGHT_MM * PX_PER_MM) {
          const pageDiv = document.createElement('div');
          pageDiv.className = 'pdf-page';
          const headerHTML = !isFirstPage ? `<h2 style="font-size: 1.5rem; color: #666; margin: 0;">${reportData.legalEntityName || "N/A"}</h2><div style="margin-bottom: 20px;"></div>` : '';
          pageDiv.innerHTML = `
            <style>
              .pdf-page {
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                box-sizing: border-box;
                position: relative;
                background: white;
                font-family: Arial, Helvetica, sans-serif;
              }
              .content-area {
                min-height: ${CONTENT_HEIGHT_MM}mm;
                overflow: hidden;
              }
              .page-footer {
                position: absolute;
                bottom: 10mm;
                left: 20mm;
                right: 20mm;
                height: 15mm;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // border-top: 1px solid #d3d3d3;
                padding-top: 5mm;
                font-size: 10px;
                color: #666;
                font-family: Arial, Helvetica, sans-serif;
              }
              .new-page-heading { margin-top: 20mm; }
            </style>
            <div class="content-area">
              ${headerHTML}
              ${currentPageContent}
            </div>
            <div class="page-footer">
              <div style="display: flex; flex-direction: column; align-items: left;">
                <img src="/images/Pann_logo.png" alt="Pann Logo" style="width: 20mm; height: auto; margin-right: 5mm;" />
                <span style="color: #868DA6; font-size: 8px;">AI Powered Business Verification & Instant Identity Monitoring</span>
              </div>
              <div style="text-align: right;">
                <p style="color: #868DA6; font-size: 8px; margin: 0;">Report generated on ${new Date().toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Karachi"
                }).replace("PM", "PM PKT").replace("AM", "AM PKT")}</p>
                <p style="font-size: 12px; margin: 0;">pann.ai</p>
              </div>
            </div>
          `;

          tempContainer.appendChild(pageDiv);

          const canvas = await html2canvas(pageDiv, {
            scale: 2,
            useCORS: true,
            logging: false,
            width: A4_WIDTH_MM * PX_PER_MM,
            height: A4_HEIGHT_MM * PX_PER_MM,
            backgroundColor: '#ffffff'
          });

          if (!isFirstPage) {
            pdf.addPage();
          }
          const imgData = canvas.toDataURL('image/jpeg', 0.92);
          pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

          modifiedReportHTML = reportHTML.replace(
            'class="report-heading"',
            'class="report-heading new-page-heading"'
          );

          currentPageContent = modifiedReportHTML;
          currentHeightPx = measureDiv.offsetHeight + (headerHTML ? 20 * PX_PER_MM : 0); // Adjust for header height
          pageNumber++;
          isFirstPage = false;

          tempContainer.removeChild(pageDiv);
        } else {
          currentPageContent += reportHTML;
          currentHeightPx += heightPx;
        }

        tempContainer.removeChild(measureDiv);
      }

      if (currentPageContent) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        const headerHTML = !isFirstPage ? `<h2 style="font-size: 1.5rem; color: #666; margin: 0;">${reportData.legalEntityName || "N/A"}</h2><div style="margin-bottom: 20px;"></div>` : '';
        pageDiv.innerHTML = `
          <style>
            .pdf-page {
              width: 210mm;
              min-height: 297mm;
              padding: 20mm;
              box-sizing: border-box;
              position: relative;
              background: white;
            }
            .content-area {
              min-height: ${CONTENT_HEIGHT_MM}mm;
              overflow: hidden;
            }
            .page-footer {
              position: absolute;
              bottom: 10mm;
              left: 20mm;
              right: 20mm;
              height: 15mm;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-top: 1px solid #d3d3d3;
              padding-top: 5mm;
              font-size: 10px;
              color: #666;
            }
          </style>
          <div class="content-area">
            ${headerHTML}
            ${currentPageContent}
          </div>
          <div class="page-footer">
            <div style="display: flex; align-items: center;">
              <img src="/images/Pann_logo.png" alt="Pann Logo" style="width: 20mm; height: auto; margin-right: 5mm;" />
              <span style="color: #868DA6; font-size: 8px;">AI Powered Business Verification & Instant Identity Monitoring</span>
            </div>
            <div style="text-align: right;">
              <p style="color: #868DA6; font-size: 8px; margin: 0;">Report generated on ${new Date().toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Karachi"
              }).replace("PM", "PM PKT").replace("AM", "AM PKT")}</p>
              <p style="font-size: 8px; margin: 0;">Page ${pageNumber}</p>
            </div>
          </div>
        `;

        tempContainer.appendChild(pageDiv);

        const canvas = await html2canvas(pageDiv, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: A4_WIDTH_MM * PX_PER_MM,
          height: A4_HEIGHT_MM * PX_PER_MM,
          backgroundColor: '#ffffff'
        });

        if (!isFirstPage) {
          pdf.addPage();
        }
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

        tempContainer.removeChild(pageDiv);
      }

      document.body.removeChild(tempContainer);

      const safeName = reportData.legalEntityName?.replace(/[^a-z0-9]/gi, '_') || "Business_Report";
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

  const renderReportToHTML = async (ReportComponent, data) => {
    if (ReportComponent === Report1) {
      return createReport1HTML(data);
    } else if (ReportComponent === Report2) {
      return createReport2HTML(data);
    } else if (ReportComponent === Report3) {
      return createReport3HTML(data);
    } else if (ReportComponent === Report4) {
      return createReport4HTML(data);
    } else if (ReportComponent === Report5) {
      return createReport5HTML(data);
    } else if (ReportComponent === Report6) {
      return createReport6HTML(data);
    }
    return '';
  };

  const createReport1HTML = (data) => {
    const calculateCompanyAge = (incorporationDate) => {
      if (!incorporationDate || incorporationDate === "N/A") return "N/A";
      const date = new Date(incorporationDate);
      const today = new Date();
      let years = today.getFullYear() - date.getFullYear();
      let months = today.getMonth() - date.getMonth();
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      return `${years} Years ${months} Months`;
    };

    const currentDate = new Date().toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi"
    }).replace("PM", "PM PKT").replace("AM", "AM PKT");

    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div style="display: flex; align-items: center;">
            <img src="/images/Pann_logo.png" alt="Pann Logo" style="width: 20mm; height: auto;" />
          </div>
          <div style="text-align: right;">
            <p style="font-size: 10px; color: #666; margin: 0;">Report generated on ${currentDate}</p>
          </div>
        </div>
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="font-size: 1.5rem; color: #333; margin: 0;">${data.legalEntityName || "N/A"}</h1>
          <div style="display: flex; gap: 2rem; margin-top: 20px;">
            <div style="flex: 0 0 40%; background-color: #f5f5f5; border-radius: 1rem; padding: 1.5rem;">
              <h3 style="font-size: 1.2rem; color: #333; margin: 0 0 15px 0; font-weight: bold;">KYB RATING</h3>
              <div style="display: flex; gap: 7rem;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="font-size: 2rem; font-weight: bold; color: #333;">${data.kybScore ? `${data.kybScore}%` : "N/A"}</span>
                  <div style="display: flex; gap: 5px; margin-top: 10px;">
                    <div style="width: 20px; height: 5px; border-radius: 2px; background-color: ${data.kybScore >= 25 ? '#ff0000' : '#e0e0e0'};"></div>
                    <div style="width: 20px; height: 5px; border-radius: 2px; background-color: ${data.kybScore >= 50 ? '#ff6600' : '#e0e0e0'};"></div>
                    <div style="width: 20px; height: 5px; border-radius: 2px; background-color: ${data.kybScore >= 75 ? '#ffcc00' : '#e0e0e0'};"></div>
                    <div style="width: 20px; height: 5px; border-radius: 2px; background-color: ${data.kybScore >= 100 ? '#d3d3d3' : '#e0e0e0'};"></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; margin-top: -0.8rem;">
                  <p style="font-size: 2rem; font-weight: bold; color: #333; margin: 0;">${data.kybRating || "N/A"}</p>
                  <p style="font-size: 0.9rem; color: #666; margin: 0;">Rating</p>
                </div>
              </div>
              <div style="margin-top: 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                  <span style="font-size: 0.9rem; color: #333; margin-left: 10px;">EXISTING LITIGATIONS</span>
                  <div style="width: 20px; height: 5px; border-radius: 2px; background-color: #ff0000;"></div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                  <span style="font-size: 0.9rem; color: #333; margin-left: 10px;">LIEN ACTIVITY</span>
                  <div style="width: 20px; height: 5px; border-radius: 2px; background-color: #ff0000;"></div>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 0.9rem; color: #333; margin-left: 10px;">STATEMENT OF INFORMATION PENALTIES</span>
                  <div style="width: 20px; height: 5px; border-radius: 2px; background-color: #ffcc00;"></div>
                </div>
              </div>
            </div>
            <div style="flex: 1; background-color: #f5f5f5; border-radius: 1rem; padding: 1.5rem;">
              <h3 style="font-size: 1.2rem; color: #333; margin: 0 0 15px 0; font-weight: bold;">BUSINESS SNAPSHOT</h3>
              ${[
                ['Incorporation Date', data.incorporationDate || "N/A"],
                ['SOS Entity Number', data.filingID || "N/A"],
                ['Secretary of State', data.status === "active" ? "Active" : data.status || "N/A"],
                ['Franchise Tax Board', data.status === "active" ? "Active" : data.status || "N/A"],
                ['Agent', data.status === "active" ? "Active" : data.status || "N/A"],
                ['Victims of Corporate Fraud Compensation Fund', data.status === "active" ? "Active" : data.status || "N/A"]
              ].map(([label, value]) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="font-size: 0.9rem; color: #333; flex: 0 0 70%;">${label}</span>
                  <span style="font-size: 0.9rem; color: #333; flex: 0 0 30%; text-align: right;">${value === "Active" ? `<span style="background-color: #28a745; color: #fff; padding: 2px 8px; border-radius: 5px; font-weight: bold;">${value}</span>` : value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div style="border: 1px solid #e0e0e0; border-radius: 5px; background-color: #fff;">
          ${[
            ['Company Name', data.legalEntityName || "N/A", true],
            ['Entity Type', data.entityType || "N/A"],
            ['Legal Entity Address', data.legalEntityAddress || "N/A"],
            ['Website', data.website || "N/A"],
            ['Incorporation Date', data.incorporationDate || "N/A"],
            ['Company Age', calculateCompanyAge(data.incorporationDate)],
            ['Agent', data.registeredAgent || "N/A"],
            ['Status', data.status || "N/A"],
            ['State', data.incorporationState || "N/A"],
            ['Formed In', data.incorporationState || "N/A"],
            ['Statement of Info Due Date', data.business?.registrations?.[0]?.next_due_date || "N/A"],
            ['B Corporation', data.business?.b_corp ? "Yes" : "No"]
          ].map(([label, value, isFirst], index) => `
            <div style="display: flex; justify-content: space-between; padding: 8px 15px; border-bottom: 1px solid #e0e0e0; position: relative; ${isFirst ? 'background-color: #F0F8FF;' : ''}">
              <span style="font-weight: bold; color: #000; flex: 0 0 30%; padding-right: 10px;">${label}</span>
              <span style="flex: 0 0 70%; text-align: left; color: #333; padding-left: 10px;">${value}</span>
              <div style="position: absolute; top: 0; bottom: 0; left: 30%; width: 1px; background-color: #e0e0e0;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  const createReport2HTML = (data) => {
    const addresses = data.addresses || [];
    const agentAddress = data.registeredAgentAddress || "N/A";
    const agentPhone = data.phoneNumber || "N/A";

    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="color: #333; margin: 5px 0 0 0;">ADDRESS & AGENT HISTORY</h1>
        </div>

        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background-color: #f5f5f5; border-radius: 2rem;">
          <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">COMMERCIAL ADDRESS</h3>
          <div style="display: inline-block; background-color:	#9ACD32; padding: 0.3rem; border-radius: 0.5rem; color: #000; font-size: 14px; font-family: Arial, sans-serif;">
            <span>DELIVERABLE<span>
          </div>
          <p style="margin: 5px 0; font-size: 0.9rem; color: #333;">${addresses[0] || "N/A"}</p>
        </div>

        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background-color: #f5f5f5; border-radius: 2rem;">
          <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">COMMERCIAL ADDRESS</h3>
          <div style="display: inline-block; background-color:	#9ACD32; padding: 0.3rem; border-radius: 0.5rem; color: #000; font-size: 14px; font-family: Arial, sans-serif;">
            <span>DELIVERABLE</span>
          </div>
          <p style="margin: 5px 0; font-size: 0.9rem; color: #333;">${addresses[0] || "N/A"}</p>
        </div>

        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background-color: #f5f5f5; border-radius: 2rem;">
          <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">COMMERCIAL ADDRESS</h3>
          <div style="display: inline-block; background-color:	#9ACD32; padding: 0.3rem; border-radius: 0.5rem; color: #000; font-size: 14px; font-family: Arial, sans-serif;">
            <span>DELIVERABLE</span>
          </div>
          <p style="margin: 5px 0; font-size: 0.9rem; color: #333;">${addresses[0] || "N/A"}</p>
        </div>

        <div style="margin-bottom: 1.5rem; padding: 1.5rem; background-color: #f5f5f5; border-radius: 2rem;">
          <h2 style="color: #333; margin: 0 0 1rem 0;">AGENT ADDRESS</h2>
          <div style="background-color: white; padding: 1.5rem; border-radius: 2rem;">
            <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">PERSONAL ADDRESS</h3>
            <p style="margin: 0; font-size: 0.9rem; color: #333;">${agentAddress}</p>
            <h3 style="font-size: 1rem; color: #333; margin: 1rem 0 0 0; font-weight: bold;">PHONE NUMBER</h3>
            <p style="margin: 0; font-size: 0.9rem; color: #333;">${agentPhone}</p>
            <p style="margin: 0; font-size: 0.9rem; color: #333;">LANDLINE-PACIFIC BELL TELEPHONE COMPANY</p>
          </div>
        </div>
      </div>
    `;
  };

  const createReport3HTML = (data) => {
    const liens = data.business?.liens || [];
    
    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="font-size: 1.5rem; color: #333; margin: 0;">WATCHLISTS</h1>
          <h3 style="font-size: 1rem; color: #333; margin: 5px 0 0 0;">DEPARTMENT OF TREASURY, OFFICE OF FOREIGN ASSETS CONTROL</h3>
          <div style="margin-top: 1.5rem;">
            <span style="font-size: 0.9rem; color: #333;">OFAC: </span>
            <span style="background-color: #9ACD32; padding: 0.3rem; border-radius: 0.5rem; font-size: 0.9rem; color: #333;">
              ${data.watchlistHits?.some(hit => hit.count > 0) ? "Hits Found" : "No Hits"}
            </span>
          </div>
        </div>
        
        <h3 style="color: #333; margin-bottom: 10px;">LIENS</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; border: 1px solid #ddd; font-size: 0.9rem; color: #333;">
          ${liens.length > 0 ? liens.map((lien, index) => `
            <div style="border-bottom: 1px solid #e0e0e0; padding: 10px 0; position: relative;">
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Status</span>
                <span style="flex: 0 0 70%; color: #28a745; padding-left: 10px;">${lien.status || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Lien</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.type || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Filed Date</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.filed_date || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Lapse Date</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.lapse_date || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">State</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.state || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Debtors</span>
                <div style="flex: 0 0 70%; padding-left: 10px;">
                  <span style="display: block;">${data.legalEntityName || "N/A"}</span>
                  <span style="display: block;">${data.legalEntityAddress || "N/A"}</span>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Secured Party</span>
                <div style="flex: 0 0 70%; padding-left: 10px;">
                  <span style="display: block;">${lien.secured_party_name || "N/A"}</span>
                  <span style="display: block;">${lien.secured_party_address || "N/A"}</span>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Amendments</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.amendments || "N/A"}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span style="font-weight: bold; flex: 0 0 30%; padding-right: 10px;">Filing Date</span>
                <span style="flex: 0 0 70%; padding-left: 10px;">${lien.filing_date || "N/A"}</span>
              </div>
              <div style="position: absolute; top: 0; bottom: 0; left: 30%; width: 1px; background-color: #e0e0e0;"></div>
            </div>
          `).join('') : '<p>No liens found</p>'}
        </div>
      </div>
    `;
  };

  const createReport4HTML = (data) => {
    const litigations = data.business?.litigations || [];
    const bankruptcyCount = data.business?.bankruptcies?.length || 0;

    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="font-size: 1.5rem; color: #333; margin: 0;">LITIGATION & BANKRUPTCIES</h1>
        </div>

        <div style="margin-bottom: 20px; border-radius: 1.5rem; background-color: #f5f5f5; padding: 15px;">
          <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">${litigations.length} HITS* ON RECORD</h3>
          <p style="font-size: 0.9rem; color: #666; margin: 5px 0;">Out of ${litigations.length} hits ${litigations.filter(l => l.type === "trademark").length} were recognized as trademarks*</p>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-top: 15px;">
            <thead>
              <tr>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Filing Date</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Litigation</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Court</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Case Type</th>
              </tr>
            </thead>
            <tbody>
              ${litigations.map(litigation => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${litigation.filing_date || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${litigation.case_name || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${litigation.court || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${litigation.type || "N/A"}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <h1 style="font-size: 1.5rem; color: #333; margin: 20px 0 10px 0;">BANKRUPTCIES</h1>
        <p style="font-size: 0.9rem; color: #333;">${bankruptcyCount > 0 ? `${bankruptcyCount} Bankruptcy${bankruptcyCount > 1 ? 'ies' : ''} Found` : "NO BANKRUPTCIES FOUND"}</p>
      </div>
    `;
  };

  const createReport5HTML = (data) => {
    const penalties = data.business?.penalties || [];

    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="font-size: 1.5rem; color: #333; margin: 0;">SOS PENALTIES</h1>
        </div>

        <div style="border-radius: 1.5rem; background-color: #f5f5f5; padding: 15px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <thead>
              <tr>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Event Type</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Filled Date</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Effective Date</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #e0e0e0; font-weight: bold;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${penalties.length > 0 ? penalties.map(penalty => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${penalty.event_type || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${penalty.filed_date || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${penalty.effective_date || "N/A"}</td>
                  <td style="padding: 8px; border: 1px solid #e0e0e0;">${penalty.description || "N/A"}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="4" style="padding: 8px; border: 1px solid #e0e0e0; text-align: center;">No penalties found</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const createReport6HTML = (data) => {
    const calculateDomainAge = (createdDate) => {
      if (!createdDate || createdDate === "N/A") return "N/A";
      const date = new Date(createdDate);
      const today = new Date();
      let years = today.getFullYear() - date.getFullYear();
      let months = today.getMonth() - date.getMonth();
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      return `${years} Years ${months} Months`;
    };

    const socialMedia = data.socialMedia || [];
    const website = data.website || "N/A";
    const domainCreated = data.business?.domain_created || "N/A";
    const domainExpiration = data.business?.domain_expiration || "N/A";
    const domainName = website !== "N/A" && website.startsWith("http") ? new URL(website).hostname : website;

    return `
      <div style="max-width: 100%; font-family: Arial, sans-serif; padding: 0;">
        <div class="report-heading" style="text-align: left; margin-bottom: 20px;">
          <h1 style="font-size: 2.5rem; color: #333; margin: 5px 0 3rem 0;">WEBSITE & SOCIAL</h1>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">WEBSITE ANALYSIS</h3>
          <p style="font-size: 0.9rem; color: #333; margin: 0;"><strong style="color: #000;">Website:</strong> ${website}</p>
          <p style="font-size: 0.9rem; color: #333; margin: 0;"><strong style="color: #000;">Domain Name:</strong> ${domainName}</p>
          <p style="font-size: 0.9rem; color: #333; margin: 0;"><strong style="color: #000;">Domain Created on:</strong> ${domainCreated}</p>
          <p style="font-size: 0.9rem; color: #333; margin: 0;"><strong style="color: #000;">Expiration:</strong> ${domainExpiration}</p>
          <p style="font-size: 0.9rem; color: #333; margin: 0;"><strong style="color: #000;">Age:</strong> ${calculateDomainAge(domainCreated)}</p>
        </div>

        ${socialMedia && socialMedia.length > 0 ? `
          <div style="margin-bottom: 20px; background-color: #f5f5f5; border-radius: 2rem; padding: 1.5rem;">
            <h2 style="font-size: 1.5rem; color: #333; margin: 0 0 10px 0;">SOCIALS</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              ${socialMedia.map((social, index) => {
                const [platform, url] = social.split(": ");
                return `
                  <div style="background-color: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #ddd;">
                    <h4 style="font-size: 0.95rem; color: #333; margin: 0 0 10px 0; font-weight: bold;">${platform || "Unknown"}</h4>
                    <p style="font-size: 0.9rem; color: #333; margin: 5px 0;">${url || "N/A"}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
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

      <div ref={reportContainerRef} className="report-wrapper">
        <div className="report-content" ref={paginatedContentRef}>
          {createPaginatedContent()}
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
              onKeyDown={handleKeyDown}
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