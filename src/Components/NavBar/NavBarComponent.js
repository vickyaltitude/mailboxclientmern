import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBarComponent.css';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          MailBox Client
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={toggleMenu}
          className="toggle-btn"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className={`menu-collapse ${isMenuOpen ? 'open' : ''}`}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="nav-link">
             Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
             Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
