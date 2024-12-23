import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Home.css';
import { emailReducerAction } from '../store/EmailReducer';
import { useDispatch,useSelector } from 'react-redux';

const Home = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const sentEmails = useSelector(state => state.emailReducer.sentEmails);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleEditorChange = (state) => {
    setEditorState(state);
    setMessage(state.getCurrentContent().getPlainText());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(message.trim() === ''){
        alert('enter atleaset a single character')
        return
    }
     
    const sendEmailToServer = await fetch('http://localhost:8000/postemail',{
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({userDetails: localStorage.getItem('userAuthId'),mail:{email,subject,message}})
    })

    dispatch(emailReducerAction.setSentEmails([...sentEmails,{_id:sentEmails.length+1,recipientEmail: email,emailSubject: subject,emailBody:message,createdDate: Date.now().toLocaleString()}]))

    const respParse = await sendEmailToServer.json();
    console.log(respParse)
    alert('Email sent successfully!');
  };



  const toolbarOptions = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
      bold: { className: 'toolbar-btn' },
      italic: { className: 'toolbar-btn' },
      underline: { className: 'toolbar-btn' },
    },
    fontSize: {
      options: [8, 10, 12, 14, 16, 18, 24, 30, 36],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'UL', 'OL'],
    },
    list: {
      options: ['unordered', 'ordered'],
    },
    link: {
      popupClassName: 'link-popup',
      formClassName: 'link-form',
      inputClassName: 'link-input',
    },
  };

  return (
    <div className="home-page">

      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8} lg={6}>
            <div className="email-form-container">
        
              <h2 className="text-center">Compose Email</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label> Receiver Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Recipient's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="editor-wrapper"
                    editorClassName="editor"
                    toolbarClassName="toolbar"
                    toolbar={toolbarOptions} 
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="send-btn">
                  Send Email
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
