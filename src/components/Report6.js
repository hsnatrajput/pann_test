import React from 'react';
import '../styles/Report6.css';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Report6 = ({ reportData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  if (!reportData) {
    return <h2 className="text-center mt-5">Loading Report...</h2>;
  }

  const calculateDomainAge = (createdDate) => {
    if (!createdDate || createdDate === "N/A") return "N/A";
    const date = new Date(createdDate);
    const today = new Date();
    const years = today.getFullYear() - date.getFullYear();
    const months = today.getMonth() - date.getMonth();
    return `${years} Years ${months} Months`;
  };

  const socialMedia = reportData.socialMedia || [];
  const website = reportData.website || "N/A";
  const domainCreated = reportData.business?.domain_created || "N/A";
  const domainExpiration = reportData.business?.domain_expiration || "N/A";
  const domainName = website !== "N/A" && website.startsWith("http") ? new URL(website).hostname : website;

  return (
    <div className="report-container">
      <div className="header">
        <h2>{reportData.legalEntityName || "N/A"}</h2>
        <h1 style={{ marginBottom: '3rem' }}>WEBSITE & SOCIAL</h1>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3>WEBSITE ANALYSIS</h3>
        <p style={{ marginBottom: '0', marginTop: '0' }}><strong>Website:</strong> {website}</p>
        <p style={{ marginBottom: '0', marginTop: '0' }}><strong>Domain Name:</strong> {domainName}</p>
        <p style={{ marginBottom: '0', marginTop: '0' }}><strong>Domain Created on:</strong> {domainCreated}</p>
        <p style={{ marginBottom: '0', marginTop: '0' }}><strong>Expiration:</strong> {domainExpiration}</p>
        <p style={{ marginBottom: '0', marginTop: '0' }}><strong>Age:</strong> {calculateDomainAge(domainCreated)}</p>
      </div>

      {socialMedia && socialMedia.length > 0 && (
        <div className="section">
            <h2>SOCIALS</h2>
            <div className="social-grid">
            {socialMedia.map((social, index) => {
                const [platform, url] = social.split(": ");
                return (
                <div key={index} className="social-box">
                    <h4>{platform || "Unknown"}</h4>
                    <p>{url || "N/A"}</p>
                </div>
                );
            })}
            </div>
        </div>
      )}

      <Footer pageNumber={6} />
    </div>
  );
};

export default Report6;