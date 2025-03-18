import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoanForm from "./LoanForm";
import LoanHeader from "./LoanHeader";
import "../../styles/Loan.css";

const Loan = () => {
  return (
    <div className="loan">
      <LoanHeader />

      <Container className="py-3 py-md-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h1 className="display-4 fw-bold">
              Boost Your Business with the{" "}
              <span className="text-dark position-relative">
                Right Loan
                <span
                  className="position-absolute start-0 bottom-0 w-100"
                  style={{ height: "5px", backgroundColor: "#FA822C" }}
                ></span>
              </span>
            </h1>
            <p className="text-muted mt-3">
              Quick approval, flexible terms, and tailored solutions.
            </p>
            <div className="mt-3">
              <Button
                variant="warning"
                className="me-2 text-white"
                style={{ backgroundColor: "#FA822C" }}
              >
                Get Started Now
              </Button>
              <Button variant="link" className="text-dark text-decoration-none">
                Explore more
              </Button>
            </div>
            <p className="text-muted mt-3">
              Quick approval, flexible terms, and tailored solutions.
            </p>
          </Col>
          <Col md={6}>
            <LoanForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Loan;