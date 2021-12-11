import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { CredentialsContext } from '../App';
import { Link } from 'react-router-dom';


function Header() {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const handleLogout = () => {
        setCredentials(null);
        localStorage.removeItem('userDataKey');
    };

    const isUserLoggedIn = () => {
        if (!credentials) {
            return loggedOutNav;
        } else return loggedInNav;
    }


    const loggedInNav = (
        <>
            <Nav.Link href="/" onClick={handleLogout} className="my-nav-link">Logout</Nav.Link>
        </>
    )

    const loggedOutNav = (
        <>
        </>
    )



    return (
        
        <Navbar bg="dark" expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark my-navbar">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        <img
                            alt="Bank logo"
                            src="/bank-img.png"
                            width="55"
                            height="50"
                            opacity=".3"
                            className="d-inline-block align-top" />
                    </Link>


                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isUserLoggedIn()}
                    </Nav>

                    <Navbar.Text>
                        {credentials &&
                            <p className="my-nav-text">Logged in as <strong>{credentials.email}</strong></p>}
                    </Navbar.Text>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;