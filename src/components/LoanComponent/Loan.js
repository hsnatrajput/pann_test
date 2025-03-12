import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoanForm from "./LoanForm";
import LoanHeader from "./LoanHeader";
import "../../styles/Loan.css"
const Loan = () => {
  return (
  <div className="loan">
    <LoanHeader />

    <Container className="d-flex justify-content-between align-items-center py-5 " >
 
      <div className="flex-grow-1 me-5 " >
        <h1 className="display-4 fw-bold">
          Boost Your Business with the{" "}
          <span className="text-dark position-relative">
            Right Loan
            <span
              className="position-absolute start-0 bottom-0 w-100"
              style={{ height: "5px" , backgroundColor: "#FA822C"}}
            ></span>
          </span>
        </h1>
        <p className="text-muted mt-5">
          Quick approval, flexible terms, and tailored solutions.
        </p>

        <div className="mt-5">
          <Button variant="warning" className="me-3 text-white" style={{ backgroundColor: "#FA822C"}}>
            Get Started Now
          </Button>
          <Button variant="link" className="text-dark text-decoration-none">
            Explore more
          </Button>

        </div>
        <p className="text-muted mt-5">
          Quick approval, flexible terms, and tailored solutions.
        </p>
      </div>

      <div >
        <LoanForm />
      </div>

    </Container>
    </div>
  );
};

export default Loan;
