import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './MailDetailPage.css';
import { useSelector } from 'react-redux';

const MailDetailPage = () => {
  const { emailId } = useParams(); 
  const navigate = useNavigate();
  const emails = useSelector(state => state.emailReducer.emails);
  const sentEmails = useSelector(state => state.emailReducer.sentEmails);

 
  const emailDetails = emails.find(email => email._id === emailId);
  const sentEmailDetails = sentEmails.find(email => email._id === emailId);
  const email = emailDetails ? emailDetails : sentEmailDetails;
 
  return (
    <div className="mail-detail-page">
      <Container>
        <Row className="mt-4 mb-4">
          <Col>
          {emailDetails &&  <Button variant="outline-light" onClick={() => navigate('/inbox')} className="btn-back">
              Back to Inbox
            </Button>}
            {sentEmailDetails && <Button variant="outline-light" onClick={() => navigate('/sentemails')} className="btn-back">
              Back to Sent Emails
            </Button>}
           
          </Col>
        </Row>

        <Row>
          <Col md={8} className="mx-auto">
            <div className="email-detail-container">
              <h3>{email.emailSubject}</h3>
              <p className="sender">From: {email.senderEmail}</p>
              <p className="date">{email.createdDate}</p>
              <hr />
              <p className="email-body">{email.emailBody}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MailDetailPage;
