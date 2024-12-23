import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Inbox.css';
import { PiCircleNotchFill } from "react-icons/pi";
import { useSelector,useDispatch } from 'react-redux';
import { emailReducerAction } from '../store/EmailReducer';
import { MdDelete } from "react-icons/md";

const InboxPage = () => {
  const navigate = useNavigate();

 const emails = useSelector(state => state.emailReducer.emails)
 const reversedEmail = [...emails].reverse();
 console.log(reversedEmail)
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

 function handleEmailDelete(e,id){
  e.stopPropagation();
   let updatedEmails = emails.filter(email => email._id !== id );
    dispatch(emailReducerAction.setEmails(updatedEmails))
    fetch('http://localhost:8000/deleteemail',{
       method: 'POST',
       headers:{
        'Content-Type' : 'application/json'
       },
       body: JSON.stringify({emailId : id})
    }).then(resp =>{

     return resp.json()
       
    }).then(data => console.log(data)).catch( err => console.log(err))
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
            <h3 className="text-center" style={{color:'whitesmoke'}}>Inbox {unRead > 0 ? <span style={{color:'orange'}}>[{unRead}]</span> : ''} </h3>
            <Table hover bordered responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reversedEmail.map((email) => (
                    
                  <tr className='mail-design' style={{fontWeight: !email.emailOpened ? 'bolder' : 'normal'}} onClick={()=>handleMailPage(email._id)} key={email._id}>
                    {<td style={{color: 'blue'}}>{!email.emailOpened ? <PiCircleNotchFill /> : ''}  </td>}
                    <td> {email.senderEmail}</td>
                    <td>{email.emailSubject}</td>
                    <td>{email.createdDate}</td>
                    <td onClick={(e)=> handleEmailDelete(e,email._id)} style={{color: 'red', fontSize:'1.8rem'}}><  MdDelete /></td>
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
