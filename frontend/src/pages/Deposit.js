import React, { useContext, useState, useEffect } from 'react';
import { CredentialsContext } from '../App';
import { Card, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';



function Deposit() {
    const [credentials] = useContext(CredentialsContext);
    const [newBalance, setNewBalance] = useState();
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState();
    const [validTrans, setValidTrans] = useState(false);



    // this one sends newBalance to the backend
    const connect = (newBalance) => {
        fetch(`http://localhost:4000/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials.email}:${credentials.password}`,
            },
            body: JSON.stringify(newBalance),
        }).then(() => { });
    };

    // fetches info when the user info is changed
    useEffect(() => {
        fetch(`http://localhost:4000/deposit`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials.email}:${credentials.password}`,
            },
        })
            .then((response) => response.json())
            .then((balance) => setBalance(balance));
    }, [credentials.email, credentials.password]);

    console.log(balance);

    const handleChange = (e) => {
        if (Number(e.target.value) <= 0) {
            alert('You can not deposit negative number');
            e.target.value = 0;
            return setValidTrans(false);
        } else {
            setValidTrans(true);
        }
            setNewBalance(Number(e.target.value) + Number(balance));

    }


    const setDeposit = (e) => {
        e.preventDefault();
        // prevent empty tasks
        // deposit is the amount to be deposited
        // I thought that this is supossed to be 
        if (!amount) return;
        // create a new deposit
        // SUPER NOT SURE ABOUT THIS ONE
        const newBalance = { id: uuidv4(), text: amount };
        setNewBalance(newBalance);
        connect(newBalance);
        setValidTrans(false);
    };




    return (


        <Card>
            <Card.Body>
                <Card.Title>Deposit</Card.Title>
                <h2>{credentials && `Your balance is: ${credentials.balance}`}</h2>
                <hr />
                <Form onSubmit={setDeposit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Enter the amount</Form.Label>
                        <Form.Control
                            type="number"
                            text="Amount to be deposited"
                            placeholder="$0"
                            value={amount}
                            onChange={(e) => handleChange(e.target.value)} />
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