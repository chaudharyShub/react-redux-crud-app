import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ showLogoutModal, setShowLogoutModal }) {

    const handleClose = () => setShowLogoutModal(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutUser = () => {
        dispatch({ type: 'LOGIN_FALSE' });
        setTimeout(() => {
            navigate('/');
        }, 300);
    }

    return (
        <Modal show={showLogoutModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to log out ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={logOutUser}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogoutModal;
