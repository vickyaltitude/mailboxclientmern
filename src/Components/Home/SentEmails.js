import React from 'react';
import { Container, Row, Col,Table } from 'react-bootstrap';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SentEmails = () => {

  const navigate = useNavigate();

 const emails = useSelector(state => state.emailReducer.sentEmails)
 const reversedEmail = [...emails].reverse();
 console.log(reversedEmail);
 

  
    function handleMailPage(id){
  
       navigate(`/inbox/${id}`)
    }

  return (
    <div className="inbox-page">
      <Container>
       

        <Row>
        
          <Col>
            <h3 className="text-center" style={{color:'whitesmoke'}}>Sent Emails</h3>
            <Table hover bordered responsive>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
             
                </tr>
              </thead>
              <tbody>
                {reversedEmail.map((email) => (
                    
                  <tr className='mail-design' style={{fontWeight: !email.emailOpened ? 'bolder' : 'normal'}} onClick={()=>handleMailPage(email._id)} key={email._id}>
                    <td> {email.senderEmail}</td>
                    <td>{email.emailSubject}</td>
                    <td>{email.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        
        </Row>
      </Container>
    </div>
  );
};

export default SentEmails;
