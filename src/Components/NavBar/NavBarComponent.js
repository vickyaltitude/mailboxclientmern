import React, { useState } from 'react';
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBarComponent.css';
import { useSelector } from 'react-redux';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);

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
          
            <Nav.Link as={Link} to="/home" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
            {!isLoggedIn && <> <Nav.Link as={Link} to="/signup" className="nav-link">
             Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
             Login
            </Nav.Link></>}
            
            {isLoggedIn && <Button type='button' variant='danger'>Logout</Button>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
