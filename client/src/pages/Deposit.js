import React, { useContext, useState, useEffect } from 'react';
import { CredentialsContext } from '../App';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handleErrors } from '../utils/handleErrors';
// import { v4 as uuidv4 } from 'uuid';




function Deposit() {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const [deposit, setDeposit] = useState("$0");
    const [trans, updateTrans] = useState({});
    const navigate = useNavigate();




    // fetches info when the user info is changed
    useEffect(() => {
        if (credentials) {
            fetch(`http://localhost:4000/transactions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${credentials.email}:${credentials.password}`,
                },
            })
                // I'm getting user info from the backend
                .then((response) => response.json())
                .then((trans) => updateTrans(trans));
        }
    }, [credentials]);






    // this one sends newBalance to the backend
    const connect = (newTrans) => {
        fetch(`http://localhost:4000/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials.email}:${credentials.password}`,
            },
            body: JSON.stringify(newTrans),
        })
            .then(response => {
                console.log("what i'm sending to the backend: ", response)
                return response.json();

            })
            .then((res) => {
                console.log("im deposiiting it", res);
                setCredentials(res.userInfo);
            })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            })
    };



    const submit = (e) => {
        e.preventDefault();
        if (deposit < 0 || !deposit) {
            alert("Please enter a valid amount!");
            return;
        }
        const newTrans = { transType: "deposit", amount: deposit };
        connect(newTrans);
    };




    return (


        <Card>
            <Card.Body>
                <Card.Title>Deposit</Card.Title>
                <h2>{credentials && `Your balance is: ${credentials.balance}`}</h2>
                <hr />
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Enter the amount</Form.Label>
                        <Form.Control
                            name="deposit"
                            type="number"
                            text="Amount to be deposited"
                            placeholder="$0"
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Add Deposit
                    </Button>


                </Form>
            </Card.Body>
        </Card>

    );
}

export default Deposit;
