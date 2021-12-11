import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentialsContext } from '../App';
// import Deposit from './Deposit';


function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);

  return (
    <div className="welcome-div">
      <h1 className="welcome-h1">{credentials && `Welcome ${credentials.name}!`}</h1>
      <h2 className="welcome-h2">{credentials && `Your balance is $${credentials.balance}`}</h2>
      
      {!credentials && <h4 className="welcome-h4">Please start by creating an account or logging in.</h4>}
      {credentials && <h4 className="welcome-h4">Choose to either deposit or withdraw some money</h4>}

      <div className="links-div">
        {!credentials && <Link to="/register" className="welcome-link"><div className="link">Create Account</div></Link>}
        {!credentials && <Link to="/login" className="welcome-link"><div className="link">Login</div></Link>}
        {credentials && <Link to="/deposit" className="welcome-link"><div className="link">Deposit</div></Link>}
        {credentials && <Link to="/withdraw" className="welcome-link"><div className="link">Withdraw</div></Link>}
      </div>
    </div>
  );
}

export default Welcome;
