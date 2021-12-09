import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { CredentialsContext } from '../App';


function Header() {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const handleLogout = () => {
        setCredentials(null);
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
        // <div className="header-div">
            <Navbar bg="secondary" expand="lg"  className="my-navbar">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt="Bank logo"
                            src="/bank-img.png"
                            width="55"
                            height="50"
                            className="d-inline-block align-top"

                        />
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
        // </div>
    );
}
export default Header;