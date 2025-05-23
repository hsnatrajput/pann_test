import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./components/Reports";
import { Helmet } from "react-helmet";

// Static data for Report1
const staticReportData = {
  businessName: "Example Corp",
  businessID: "12345-XYZ",
  searchDate: "05/23/2025",
  legalEntityName: "Example Corporation Inc.",
  legalEntityAddress: "123 Main St, Springfield, IL, 62701",
  email: "contact@example.com",
  tin: "12-3456789",
  officers: "John Doe, Jane Smith",
  phoneNumber: "+1 (555) 123-4567",
  website: "www.example.com",
  riskRating: "A",
  riskLevel: "Low Risk",
  kybRating: "A",
  kybLevel: "Fully Verified",
  address: "123 Main St, Springfield, IL, 62701",
  business: {
    incorporation_date: "01/01/2010",
    incorporation_state: "IL",
    months_in_business: 180,
    structure: "Corporation",
    predicted_naics: ["541511"],
    registrations: [
      {
        status: "active",
        registered_agent: { name: "Agent Smith", address: { street: "456 Agent St", city: "Springfield", state: "IL", zip: "62701" } },
        file_number: "F123456",
        issue_date: "01/01/2010"
      }
    ]
  },
  businessOfficers: [
    { name: "John Doe", roles: "CEO", sos_filings: 2 },
    { name: "Jane Smith", roles: "CFO", sos_filings: 1 }
  ],
  watchlistHits: [],
  registrations: [{ status: "active", name: "Example Corp", address: { street: "123 Main St", city: "Springfield", state: "IL", zip: "62701" } }],
  incorporationDate: "01/01/2010",
  incorporationState: "IL",
  businessAge: "15 years",
  structure: "Corporation",
  entityType: "Corporation",
  naicsCode: "541511",
  status: "Active",
  filingStatus: [
    { name: "Active Filings", value: 1, color: "#E47628" },
    { name: "Inactive Filings", value: 0, color: "#2F4532" },
    { name: "Unknown", value: 0, color: "#F6CBA9" }
  ],
  registeredAgent: "Agent Smith",
  registeredAgentAddress: "456 Agent St, Springfield, IL 62701",
  filingID: "F123456",
  dateFiled: "01/01/2010",
  addresses: ["123 Main St, Springfield, IL 62701"],
  phoneNumbers: ["+1 (555) 123-4567"],
  socialMedia: ["LinkedIn: linkedin.com/company/example"],
  inquiryVariations: [
    {
      ein: "12-3456789",
      entityName: "Example Corp",
      entityAddress: "123 Main St, Springfield, IL 62701",
      officers: "John Doe, Jane Smith"
    }
  ]
};

const App = () => {
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
          {/* Directly route to Reports with static data */}
          <Route
            path="/"
            element={<Reports reportData={staticReportData} hasPaid={true} />}
          />
          {/* Optional: Add routes for other reports with the same static data */}
          <Route
            path="/report1"
            element={<Reports reportData={staticReportData} hasPaid={true} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;