import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const LoanHeader = () => {
  return (
    <Navbar expand="lg" bg="light" className="py-2">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/images/Pann_logo.png"
            alt="Pann Logo"
            className="header-logo"
            style={{ height: "40px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#">HOME</Nav.Link>
            <Nav.Link href="#">LOAN</Nav.Link>
            <Nav.Link href="#">APPLICATION PROCESS</Nav.Link>
            <Nav.Link href="#">RESOURCES</Nav.Link>
            <Nav.Link href="#">ABOUT US</Nav.Link>
            <Nav.Link href="#">CONTACT US</Nav.Link>
          </Nav>

          <Button
            variant="warning"
            className="text-white"
            style={{ backgroundColor: "#FA822C" }}
          >
            Log In / Sign Up
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoanHeader;