import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoanForm = () => {
  return (
    <Container className="bg-light p-4 rounded shadow">
      <h2 className="text-center fw-bold">Get Your Business Loan</h2>
      <p className="text-center text-muted">Start your application</p>

      <div className="d-flex justify-content-center mb-4">
        <div
          className="bg-warning rounded-pill mx-1"
          style={{ width: "40px", height: "5px" }}
        ></div>
        <div
          className="bg-secondary rounded-pill mx-1"
          style={{ width: "40px", height: "5px" }}
        ></div>
        <div
          className="bg-secondary rounded-pill mx-1"
          style={{ width: "40px", height: "5px" }}
        ></div>
      </div>

      <Form>
        <Row className="g-3">
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter business name" />
          </Col>
          <Col md={6}>
            <Form.Select>
              <option>Business Industry</option>
              <option>Accommodation</option>
              <option>Retail</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter years of experience" />
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter month" />
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter team members" />
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter monthly revenue" />
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter business street" />
          </Col>
          <Col md={6}>
            <Form.Control type="text" placeholder="Enter business city" />
          </Col>
        </Row>

        <div className="mt-4">
          <p className="text-muted">Do you have existing business loans?</p>
          <Form.Check inline label="Yes" name="loan" type="radio" id="yes" />
          <Form.Check inline label="No" name="loan" type="radio" id="no" />
        </div>

        <Button className="mt-4 w-100" variant="warning">
          Submit Application
        </Button>
      </Form>
    </Container>
  );
};

export default LoanForm;
