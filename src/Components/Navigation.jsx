import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import ModalLogout from './ModalLogout';

function Navigation() {

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(false);

    const selector = useSelector(state => state);

    useEffect(() => {
        const companyEmail = JSON.parse(localStorage.getItem('companyEmail'));
        if (companyEmail) setIsUserLogin(true);
        else setIsUserLogin(false);
    }, []);

    return (
        <Navbar style={{ position: 'sticky', top: 0 }} bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="">
                    {isUserLogin
                        ? `${selector.productReducer.userName ? selector.productReducer.userName.toUpperCase() : 'Loading....'}`
                        : 'ADMIN'}
                </Navbar.Brand>
                <Button variant="light" onClick={() => setShowLogoutModal(true)}>
                    Logout
                </Button>
            </Container>
            {
                showLogoutModal ? <ModalLogout
                    showLogoutModal={showLogoutModal}
                    setShowLogoutModal={setShowLogoutModal}
                /> : null
            }
        </Navbar>
    )
}

export default Navigation;
