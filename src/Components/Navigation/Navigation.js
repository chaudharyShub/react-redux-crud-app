import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogoutModal from '../LogoutModal/LogoutModal';

function Navigation() {

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Header</Navbar.Brand>
                <Button className='mx-3' variant="light" onClick={() => setShowLogoutModal(true)}>
                    Logout
                </Button>
            </Container>
            {
                showLogoutModal ? <LogoutModal
                    showLogoutModal={showLogoutModal}
                    setShowLogoutModal={setShowLogoutModal}
                /> : null
            }
        </Navbar>
    )
}

export default Navigation;
