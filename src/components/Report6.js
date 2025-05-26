import React from 'react';
import '../styles/Report6.css';
import Footer from './Footer';

const Report6 = () => {
  return (
    <div className="report-container">
      <div className="header">
        <h2>OAKLAND PRO SOCCER LLC</h2>
        <h1 style={{marginBottom:'3rem'}}>WEBSITE & SOCIAL</h1>
      </div>

      <div style={{marginBottom:'1.5rem'}}>
        <h3>WEBSITE ANALYSIS</h3>
        <p style={{marginBottom:'0' , marginTop:'0'}}><strong>Website:</strong> oaklandrootssc.com/</p>
        <p style={{marginBottom:'0' , marginTop:'0'}}><strong>Domain Name:</strong> oaklandrootssc.com</p>
        <p style={{marginBottom:'0' , marginTop:'0'}}><strong>Domain Created on:</strong> 12/21/2017</p>
        <p style={{marginBottom:'0' , marginTop:'0'}}><strong>Expiration:</strong> 12/21/2025</p>
        <p style={{marginBottom:'0' , marginTop:'0'}}><strong>Age:</strong> 7 Years 4 Months</p>
      </div>

      <div className="section">
        <h2>SOCIALS</h2>
        <div className="social-grid">
          <div className="social-box">
            <h4>LINKEDIN</h4>
            <p>Total Followers: 8,000</p>
            <p>Page verified on: March 8, 2025</p>
            <p>Industry: Spectator Sports</p>
            <p>Company size: 1-50 employees, 67 associated members</p>
            <p>Headquarters: Oakland, California</p>
            <p>Founded: 2018</p>
          </div>
          <div className="social-box">
            <h4>TWITTER/X</h4>
            <p><strong>Total Followers:</strong> 20,339</p>
            <p><strong>Total Following:</strong> 2,342</p>
            <p><strong>Location:</strong> Oakland, California</p>
            <p><strong>Joined:</strong> May 2017</p>
            <p><strong>Tickets Reservation:</strong> https://seatgeek.com/oakland-roots-tickets</p>
          </div>
          <div className="social-box">
            <h4>INSTAGRAM</h4>
            <p>Total Followers: 78,072</p>
            <p>Total Posts: 7504</p>
            <p>Engagement: 4.19%</p>
            <p>Average Likes: 1090</p>
            <p>Average Comments: 21</p>
          </div>
          <div className="social-box">
            <h4>YOUTUBE US</h4>
            <p>Country: US</p>
            <p>Total Views: 318,735</p>
            <p>Total Subs: 8,000</p>
            <p>Last 28 Days Subs: 30</p>
          </div>
          <div className="social-box">
            <h4>FACEBOOK</h4>
            <p>Total Followers: 19,836</p>
            <p>Location: Oakland, CA</p>
            <p>Email: tickets@rootssc.com</p>
            <p>Created on:07/18/2018</p>
          </div>
        </div>
      </div>

      <Footer pageNumber={6} />
    </div>
  );
};

export default Report6;