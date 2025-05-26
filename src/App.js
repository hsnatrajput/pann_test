import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyForm from "./components/VerifyForm";
import Reports from "./components/Reports"; 
import { Helmet } from "react-helmet";

const App = () => {
  const [reportData, setReportData] = useState(null);
  const [hasPaid, setHasPaid] = useState(false); 

  return (
    <>
    <Helmet>
      <title>Pann Capital Platform</title>
      <meta
        name="description"
        content="Pann KYB Validate your business partner in seconds. Fast and secure business verification platform to eliminate fraud"
      />
      <meta property="og:title" content="Pann Capital Platform" />
      <meta property="og:description" content="Fast and secure business verification platform to eliminate fraud" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pann.app" />
    </Helmet>
    <Router>
      <Routes>
        <Route path="/" element={<VerifyForm setReportData={setReportData} />} />
        <Route 
          path="/report1" 
          element={<Reports reportData={reportData} hasPaid={hasPaid} setHasPaid={setHasPaid} />}
        />
      </Routes>
    </Router>
   </> 
  );
};

export default App;