import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import FormInputComponent from '../Others/FormInputComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyToArray } from '../../Redux/actions';
import uuid from 'react-uuid';
import 'react-toastify/dist/ReactToastify.css';


function ModalCompany({ showModal, setShowModal, modalDetails, setModalDetails, isEditing, setIsEditing }) {

    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [details, setDetails] = useState({
        userName: '',
        companyName: '',
        email: '',
        password: ''
    });

    const companies = selector.companyReducer.companies;

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setModalDetails({});
    }

    useEffect(() => {
        if (isEditing) setDetails(modalDetails);
    }, [isEditing]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }
        else if (isEditing) {
            setTimeout(() => {
                const index = companies.findIndex(items => items.uniqueId === details.uniqueId);
                companies.splice(index, 1, details);
                const arr = [...companies];
                dispatch(addCompanyToArray('UPDATE_COMPANY', arr));
            }, 500);
        }
        else {
            const body = { ...details, uniqueId: uuid() };
            dispatch(addCompanyToArray('ADD_COMPANY', body));
        }
        event.preventDefault();
        handleClose();
    }

    const handleChange = e => {
        const { id, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Company Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormInputComponent
                            label='Company name'
                            type='text'
                            placeholder='Enter Company name'
                            onChange={handleChange}
                            value={details.companyName}
                            id='companyName'
                            errorMsg='Please enter valid name'
                        />
                        <FormInputComponent
                            label='Username'
                            type='text'
                            placeholder='Enter usermame'
                            onChange={handleChange}
                            value={details.userName}
                            id='userName'
                            errorMsg='Please enter valid username'
                        />
                        <FormInputComponent
                            label='Email'
                            type='email'
                            placeholder='Enter email'
                            onChange={handleChange}
                            value={details.email}
                            id='email'
                            errorMsg='Please enter valid email'
                        />
                        <FormInputComponent
                            label='Password'
                            type='password'
                            placeholder='Enter password'
                            onChange={handleChange}
                            value={details.password}
                            id='password'
                            errorMsg='Please enter password'
                        />
                        <Button variant="primary" type='submit'>
                            {isEditing ? 'Update' : 'Save Changes'}
                        </Button>
                        <Button className='mx-3' variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCompany;
