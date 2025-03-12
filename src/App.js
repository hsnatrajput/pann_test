import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyForm from "./components/VerifyForm";
import Reports from "./components/Reports"; 

const App = () => {
  const [reportData, setReportData] = useState(null);
  const [hasPaid, setHasPaid] = useState(false); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerifyForm setReportData={setReportData} />} />
        <Route 
          path="/report1" 
          element={<Reports reportData={reportData} hasPaid={hasPaid} setHasPaid={setHasPaid} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
