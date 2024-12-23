import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './About.css';


const About = () => {
  return (
    <div className="about-page">
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Img variant="top" src='https://img.freepik.com/free-vector/mail-envelope-with-1-alert_78370-3334.jpg' alt="Mailbox" />
              <Card.Body>
                <Card.Title>About Mailbox Client</Card.Title>
                <Card.Text>
                  Welcome to Mailbox Client, the ultimate solution for all your email communication needs! Our platform is designed to make sending and receiving emails simple, secure, and efficient.
                  Whether you're managing personal or professional correspondence, Mailbox Client offers a smooth and user-friendly interface, combined with powerful features to help you stay on top of your inbox. 
                  With built-in support for composing, reading, organizing, and managing emails, we aim to provide a seamless communication experience for users across the globe.
                </Card.Text>
                <Button variant="primary" href="/signup">
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h2 className="text-center">Why Choose Mailbox Client?</h2>
            <ul>
              <li><strong>Easy to Use:</strong> With a clean and intuitive interface, Mailbox Client makes email management hassle-free.</li>
              <li><strong>Secure:</strong> We prioritize your privacy with advanced security features to keep your communication safe.</li>
              <li><strong>Cross-platform:</strong> Access your inbox from anywhere, whether on a computer, tablet, or smartphone.</li>
              <li><strong>Customizable:</strong> Tailor your email experience with various settings and filters to suit your preferences.</li>
              <li><strong>Fast:</strong> With optimized performance, our platform ensures a smooth and quick experience even with large volumes of emails.</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
