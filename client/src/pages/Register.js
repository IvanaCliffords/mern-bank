import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CredentialsContext } from '../App';
import { handleErrors } from '../utils/handleErrors';
import { Card, Form, Button } from 'react-bootstrap';

// import { useForm } from 'react-hook-form';
const StyledError = styled.span`
  color: red;
`;


function Register() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0)
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [credendentials, setCredentials] = useContext(CredentialsContext);


  // const { register, handleSubmit, errors } = useForm();
  // const onSubmit = ( data ) => alert(JSON.stringify(data)); 


  const createAccount = () => {

    fetch(`http://localhost:4000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        balance
      }),
    })
      .then(handleErrors)
      .then((res) => {
        console.log("register", res);
        setCredentials(res.userInfo);
        alert('Account successfully created!')
        localStorage.setItem(credendentials, JSON.stringify(credendentials));
        console.log(res.userInfo);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    if(!name || !email || !password) {
      alert("All fields are required!");
  
    }
    else if(password.length < 8){
      alert("Password needs to be at least eight characters long!");
    }
    else 
    createAccount();
  }

  return (


    <Card>
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        {<p>Please fill in the following information</p>}
        <hr />
        <>
          <Form onSubmit={submit}>
            {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                // {...register("name")}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </Form.Group>
    

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                // {...register("email")}
                type="email"
                placeholder="Enter your email"               
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                // {...register("password")}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            


            <Button variant="dark" type="submit">
              Create Account
            </Button>

          </Form>

        </>

      </Card.Body>
    </Card>


  )
}








export default Register;
