import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userReducerAction } from '../store/UserReducer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
     
     const checkUser = await fetch('http://localhost:8000/userlogin',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({userEmail:email,password:password})
     });
  
     const parsecheckUser = await checkUser.json();

     if(checkUser.ok){
     
      console.log(parsecheckUser)
      setError(null)
      dispatch(userReducerAction.setIsLoggedIn(true))
      dispatch(userReducerAction.setCurrentUserToken(parsecheckUser.userId))
      localStorage.setItem('userAuthId',parsecheckUser.userId)
      alert('Login successful');
      navigate('/home')

     }else{
      setError(parsecheckUser.msg)
     }

   
  };

  return (
    <div className="login-page">
      <Container fluid className="d-flex justify-content-center align-items-center h-100">
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={8} md={6} lg={5} className="d-flex justify-content-center">
            <div className="login-form-container">
              <h2 className="login-heading">Login</h2>
              {error && <p style={{color: 'red'}}>{error}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="login-btn">
                  Login
                </Button>
              </Form>
              <div className="login-footer">
                <p>
                  Don't have an account? <a href="/signup">Sign up</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
