import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './MailDetailPage.css';
import { useSelector } from 'react-redux';

const MailDetailPage = () => {
  const { emailId } = useParams(); 
  const navigate = useNavigate();
  const emails = useSelector(state => state.emailReducer.emails);

  console.log(emailId)
  console.log(emails)
  const emailDetails = emails.find(email => email._id === emailId);
  console.log(emailDetails)
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
              <h3>{emailDetails.emailSubject}</h3>
              <p className="sender">From: {emailDetails.senderEmail}</p>
              <p className="date">{emailDetails.createdDate}</p>
              <hr />
              <p className="email-body">{emailDetails.emailBody}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MailDetailPage;
