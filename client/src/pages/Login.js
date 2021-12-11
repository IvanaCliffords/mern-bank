import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CredentialsContext } from '../App';
import { handleErrors } from '../utils/handleErrors';
import { Card, Form, Button } from 'react-bootstrap';

const StyledError = styled.span`
  color: red;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [credentials, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {

    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email,
        password

      }),
    })
      .then(handleErrors)
      .then((res) => {
        console.log(res);
        // localStorage.setItem('userDataKey', JSON.stringify(res.userInfo));
        // localStorage.setItem('testKey', "test value");
        // // not sure about this one
        setCredentials(res.userInfo);
        alert('You successfully logged in!')
        
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (

    <Card>
      <Card.Body>

        <Card.Title>Login</Card.Title>
        {<p>Please fill in the following information</p>}
        <hr />
        <>
          <Form
            onSubmit={login}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={event => setEmail(event.currentTarget.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password} 
                onChange={event => setPassword(event.currentTarget.value)} />
            </Form.Group>

            <Button
              variant="dark"
              type="submit">
              Login
            </Button>
          </Form>
        </>
      </Card.Body>
    </Card>
  );
}





export default Login;
