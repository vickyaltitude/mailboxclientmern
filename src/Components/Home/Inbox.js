import React ,{useEffect,useState} from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Inbox.css';
import { emailReducerAction } from '../store/EmailReducer';
import { useSelector } from 'react-redux';


const InboxPage = () => {
  const navigate = useNavigate();
 const currentUser = useSelector(state => state.userReducer.currentUserToken);
 const emails = useSelector(state => state.emailReducer.emails)
 const [isLoading,setIsLoading] = useState(false);
 

  const handleCompose = () => {
    navigate('/home');
  };

  function handleMailPage(id){
     navigate(`/inbox/${id}`)
  }

  useEffect(()=>{

    setIsLoading(true)

    if(localStorage.getItem('userAuthId')){
         
      fetch('http://localhost:8000/getemail',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('userAuthId')
        }
      }).then(async resp =>{
       const parsedData = await resp.json();
      console.log(parsedData)
      emailReducerAction.setEmails(parsedData.data)
       
      }).catch(err => console.log(err))
  

    }
    setIsLoading(false)
   
  },[currentUser])


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
            {isLoading && <h3>Loading please wait...</h3>}
            {!isLoading &&   <Col>
            <h3 className="text-center">Inbox</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                    
                  <tr onClick={()=>handleMailPage(email._id)} key={email._id}>
                    <td>{email.senderEmail}</td>
                    <td>{email.emailSubject}</td>
                    <td>25-05-2024</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>}
        
        </Row>
      </Container>
    </div>
  );
};

export default InboxPage;
