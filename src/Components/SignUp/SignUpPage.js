import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import './SignUpPage.css'; 

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [signupSuccess,setSignupSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
        setError('Password not match')
        return
    }
    else if(formData.password.length < 6){
       setError('Password length should be minimum 6')
       return
    }
    setIsLoading(true)
    const sendUserDetails = await fetch('http://localhost:8000/usersignup',{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(formData)
    })
    const parsedResp = await sendUserDetails.json();

    if(sendUserDetails.status){
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      })
      setSignupSuccess('User logged in successfull! Redirecting to login page...')

      setTimeout(()=>{
        setSignupSuccess('')
        navigate('/login')
      },1500)

    }
    console.log(parsedResp)
    setIsLoading(false)

  };

  return (
    <div className="signup-page">
      <div className="signup-form-container">
        <h2 className="signup-heading">Sign Up</h2>
        {signupSuccess && <p>{signupSuccess}</p>}
        {error && <p style={{color:'red'}}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </Form.Group>

          <button type="submit" className="signup-btn">
            {isLoading ? 'Submitting please wait...' : 'Sign Up'}
          </button>

          <div className="signup-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
