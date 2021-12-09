import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentialsContext } from '../App';
import Deposit from './Deposit';


function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);

  return (
    <div className="welcome-div">
      <h1 className="welcome-h1">{credentials && `Welcome ${credentials.name}! Your balance is $${credentials.balance}`}
      </h1>
      <div className="links-div">
        {!credentials && <Link to="/register" className="welcome-link">Register </Link>}
        
        {!credentials && <Link to="/login" className="welcome-link">Login</Link>}

        {credentials && <Link to="/deposit" className="welcome-link">Deposit</Link>}
        {credentials && <Link to="/withdraw" className="welcome-link">Withdraw</Link>}
      </div>
    </div>
  );
}

export default Welcome;
