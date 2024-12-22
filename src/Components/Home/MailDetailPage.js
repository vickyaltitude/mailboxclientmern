import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './MailDetailPage.css';

const MailDetailPage = () => {
  const { emailId } = useParams(); 
  const navigate = useNavigate();

  console.log(emailId)
  const emails = [
    { id: 1, sender: 'john@example.com', subject: 'Meeting Tomorrow', date: '2024-12-22', body: 'Let\'s meet tomorrow at 3 PM at the office.' },
    { id: 2, sender: 'jane@example.com', subject: 'Your Account Update', date: '2024-12-21', body: 'Your account has been updated. Please check your profile.' },
    { id: 3, sender: 'admin@example.com', subject: 'Newsletter - December', date: '2024-12-20', body: 'Here is the newsletter for December. Enjoy the updates!' },
    { id: 4, sender: 'lucas@example.com', subject: 'Reminder: Project Deadline', date: '2024-12-19', body: 'Don\'t forget about the project deadline coming up this Friday!' },
  ];

  const emailDetails = emails.find(email => email.id === parseInt(emailId));

  if (!emailDetails) {
    navigate('/inbox');
  }

  return (
    <div className="mail-detail-page">
      <Container>
        <Row className="mt-4 mb-4">
          <Col>
            <Button variant="outline-light" onClick={() => navigate('/inbox')} className="btn-back">
              Back to Inbox
            </Button>
          </Col>
        </Row>

        <Row>
          <Col md={8} className="mx-auto">
            <div className="email-detail-container">
              <h3>{emailDetails.subject}</h3>
              <p className="sender">From: {emailDetails.sender}</p>
              <p className="date">Received: {emailDetails.date}</p>
              <hr />
              <p className="email-body">{emailDetails.body}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MailDetailPage;
