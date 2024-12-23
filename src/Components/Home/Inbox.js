import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Inbox.css';
import { PiCircleNotchFill } from "react-icons/pi";
import { useSelector,useDispatch } from 'react-redux';
import { emailReducerAction } from '../store/EmailReducer';

const InboxPage = () => {
  const navigate = useNavigate();

 const emails = useSelector(state => state.emailReducer.emails)
 const unRead = emails.reduce((cumul,curr)=> cumul = cumul + !curr.emailOpened,0)
 const dispatch = useDispatch();
 

 

  const handleCompose = () => {
    navigate('/home');
  };

  function handleMailPage(id){
   
    let updatedEmails = emails.map(email => email._id === id ? {...email,emailOpened:true} : email);
    console.log(updatedEmails)
    dispatch(emailReducerAction.setEmails(updatedEmails))

    fetch('http://localhost:8000/reademail',{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ emailId: id})
    }).then(resp =>{
      console.log(resp)
    }).catch(err => console.log(err))

     navigate(`/inbox/${id}`)
  }



  return (
    <div className="inbox-page">
      <Container>
        <Row className="mt-4 mb-4">
          <Col>
            <Button variant="success" onClick={handleCompose} className="btn-compose">
              Compose
            </Button>
          </Col>

        </Row>

        <Row>
        
          <Col>
            <h3 className="text-center" style={{color:'whitesmoke'}}>Inbox <span style={{color:'orange'}}>[{unRead}]</span></h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                    
                  <tr style={{fontWeight: !email.emailOpened ? 'bolder' : 'normal'}} onClick={()=>handleMailPage(email._id)} key={email._id}>
                    {<td style={{color: 'blue'}}>{!email.emailOpened ? <PiCircleNotchFill /> : ''}  </td>}
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

export default InboxPage;
