
  import React, { useContext } from 'react';
  import { Link } from 'react-router-dom';

  import { CredentialsContext } from '../App';
  // import Deposit from './Deposit';


  function Welcome() {
    const [credentials, setCredentials] = useContext(CredentialsContext);

    return (
      <div className="welcome-div">
        <h1 className="welcome-h1">{credentials && `Welcome ${credentials.name}!`}</h1>
        <h1 className="welcome-h1">{!credentials && `Welcome to the badest bank`}</h1>

        <h2 className="welcome-h2">{credentials && `Your balance is $${credentials.balance}`}</h2>
        <h2 className="welcome-h2">{!credentials && `You probably don't want to do business with.`}</h2>


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







  // useEffect with the helper api functions to get the user data for the rest of the components (mainly, welcome); also, watch the video to set up local storage 
  // const isUserLoggedIn = () => {
  //   if (!credentials) {
  //     return loggedOutWelcome;
  //   } else return loggedInWelcome;
  // }

  // const loggedInWelcome = () => (
  //   <> 
  //     <h1 className="welcome-h1">{`Welcome ${credentials.name}!`}</h1>
  //     <h2 className="welcome-h2">{`Your balance is $${credentials.balance}`}</h2>
  //     <h4 className="welcome-h4">{`Chose further action: Make deposit or withrawal, or logout.`}</h4>
  //     <div className="links-div">
  //       <Link to="/deposit" className="welcome-link"><div className="link">Deposit</div></Link>
  //       <Link to="/withdraw" className="welcome-link"><div className="link">Withdraw</div></Link>
  //     </div>
  //   </>
  // );


  // const loggedOutWelcome = () => (
  //   <>
  //     <h1 className="welcome-h1">{`Welcome to the badest bank.`}</h1>
  //     <h2 className="welcome-h2">{`Why are you choosing to work with us?`}</h2>
  //     <h4 className="welcome-h4">{`Chose further action: Create account or login.`}</h4>
  //     <div className="links-div">
  //       <Link to="/register" className="welcome-link"><div className="link">Create Account</div></Link>
  //       <Link to="/login" className="welcome-link"><div className="link">Login</div></Link>
  //     </div>
  //   </>
  // );



  //   return (
  //     <div className="welcome-div">
  //     {isUserLoggedIn()}
  //     </div>

  //   );
  // }

  // export default Welcome;
