import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import FormInputComponent from '../Others/FormInputComponent';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from '../../lib/firebase';
import { notify } from '../Common/CommonFunctions';
import 'react-toastify/dist/ReactToastify.css';

function ModalCompany({ showModal, setShowModal, modalDetails, setModalDetails, isEditing, setIsEditing }) {

    const [validated, setValidated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [details, setDetails] = useState({});

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setModalDetails({});
    }

    const handleChange = e => {
        const { id, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    useEffect(() => {
        if (isEditing) setDetails(modalDetails);
    }, [isEditing]);


    const createUser = (auth, email, password) => {
        fetchSignInMethodsForEmail(auth, email).then(signInMethods => {
            if (signInMethods.length >= 1) {
                notify('Email already exists !!!');
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            addDoc(collection(db, 'company'), details)
                .then(() => '')
                .catch(err => console.log(err));
        });
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }
        else if (isEditing) {
            const docRef = doc(db, 'company', details.id);
            setDoc(docRef, details)
                .then(() => '')
                .catch(err => console.log(err));
        }
        else {
            createUser(auth, details.email, details.password);
        }
        event.preventDefault();
        handleClose();
    }


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>
                    {isEditing ? 'Edit Company Details' : 'Company Details'}
                </Modal.Title>
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
                        isEditing={isEditing}
                    />
                    <FormInputComponent
                        label='Password'
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder='Enter password'
                        onChange={handleChange}
                        value={details.password}
                        id='password'
                        errorMsg='Please enter password'
                    />
                    <Form.Check
                        type='checkbox'
                        htmlFor='showHidePassword'
                        id='showHidePassword'
                        label={`${showPassword ? 'Hide' : 'Show'} password`}
                        className='my-3'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <Button variant="primary" type='submit'>
                        {isEditing ? 'Update' : 'Save'}
                    </Button>
                    <Button className='mx-3' variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCompany;
