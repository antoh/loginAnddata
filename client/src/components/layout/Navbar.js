import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

class NavbarShow extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="light">
        <Navbar.Brand href="#home">
          {" "}
          <Link to="/">Turbulence Reporting System</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="#deets">Hello Guest</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarShow;
