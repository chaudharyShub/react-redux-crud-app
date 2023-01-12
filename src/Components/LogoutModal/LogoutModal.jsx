import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ showLogoutModal, setShowLogoutModal }) {

    const navigate = useNavigate();

    const handleClose = () => setShowLogoutModal(false);

    const logOutUser = () => {
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("companyEmail");
            navigate('/');
        }, 300);
    }

    return (
        <Modal show={showLogoutModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to log out ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer style={{ justifyContent: 'center' }}>
                <Button variant="primary" style={{ width: '45%' }} onClick={logOutUser}>
                    Yes
                </Button>
                <Button variant="danger" style={{ width: '45%' }} onClick={handleClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;
