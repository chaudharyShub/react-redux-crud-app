import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormInputComponent from '../Others/FormInputComponent';
import { superAdminCreds } from '../../Utilities/Creds';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Login.css';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { superAdminEmail, superAdminPassword } = superAdminCreds;
    const [validated, setValidated] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [inputValue, setInputValue] = useState({});

    const handleChange = e => {
        const { value, id } = e.target;
        setInputValue(prev => ({
            ...prev,
            [id]: value
        }));
    }

    useEffect(() => {
        const isAdminLogin = localStorage.getItem('isAdminLogin');
        if (isAdminLogin === 'true') {
            setShowLoader(true);
            setTimeout(() => {
                dispatch({ type: 'LOGIN_TRUE' });
                navigate('/admin');
            }, 1000);
        }
        const isUserLogin = localStorage.getItem('isUserLogin');
        if (isUserLogin === 'true') {
            setShowLoader(true);
            setTimeout(() => {
                dispatch({ type: 'USER_LOGIN_TRUE' });
                navigate('/user');
            }, 1000);
        }
    }, []);


    const handleSubmit = e => {
        const companyCred = JSON.parse(localStorage.getItem('companies'));
        const a = companyCred.find(item => item.email === inputValue.loginEmail);

        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
        if (inputValue.loginEmail === superAdminEmail &&
            inputValue.loginPassword === superAdminPassword) {
            setShowLoader(true);
            setTimeout(() => {
                dispatch({ type: 'LOGIN_TRUE' });
                navigate('/admin');
            }, 1000);
        }
        else if (inputValue.loginEmail === a.email &&
            inputValue.loginPassword === a.password) {
            setShowLoader(true);
            setTimeout(() => {
                dispatch({ type: 'USER_LOGIN_TRUE' });
                navigate('/user');
            }, 1000);
        }
        else {
            alert('Wrong Credentials');
            dispatch({ type: 'LOGIN_FALSE' });
            dispatch({ type: 'USER_LOGIN_FALSE' });
            setShowLoader(false);
        };
        setInputValue({});
    }

    return (
        showLoader ?
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

            :

            <>
                <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            admin: shubham@gmail.com
                            password: 12345 <br />
                            user: tata@gmail.com
                            password: 12345
                        </Tooltip>
                    }
                >
                    <Button className='details_tooltip' variant="link">Login details</Button>
                </OverlayTrigger>
                <Form
                    className='mx-auto custom_form'
                    onSubmit={handleSubmit}
                    noValidate
                    validated={validated}
                >
                    <FormInputComponent
                        label='Email'
                        type='email'
                        placeholder='Enter email'
                        id='loginEmail'
                        value={inputValue.loginEmail}
                        errorMsg='Please enter valid email'
                        onChange={handleChange}
                    />
                    <FormInputComponent
                        label='Password'
                        type='password'
                        placeholder='Enter password'
                        id='loginPassword'
                        value={inputValue.loginPassword}
                        errorMsg='Please enter password'
                        onChange={handleChange}
                    />
                    <Button variant="dark" className='mt-2 w-100' type='submit'>
                        Login
                    </Button>
                </Form>
            </>
    );
}

export default Login;
