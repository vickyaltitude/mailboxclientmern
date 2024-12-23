import React, { useState } from 'react';
import { Navbar, Nav, Container,Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBarComponent.css';
import { useSelector,useDispatch } from 'react-redux';
import {userReducerAction} from '../store/UserReducer';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () =>{
    localStorage.removeItem('userAuthId');
    dispatch(userReducerAction.setCurrentUserToken(null));
    navigate('/login');
  }

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
          
            <Nav.Link as={Link} to="/home" className="nav-link">Compose</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
            <Nav.Link as={Link} to="/inbox" className="nav-link">Inbox</Nav.Link>
            <Nav.Link as={Link} to="/sentemails" className="nav-link">Sent-Emails</Nav.Link>
            {!isLoggedIn && <> <Nav.Link as={Link} to="/signup" className="nav-link">
             Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
             Login
            </Nav.Link></>}
            
            {isLoggedIn && <Button type='button' variant='danger' onClick={handleLogout}>Logout</Button>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
