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

    // hello world

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { superAdminEmail, superAdminPassword } = superAdminCreds;
    const [validated, setValidated] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);
    const [inputValue, setInputValue] = useState({
        superAdminEmail: '',
        superAdminPassword: ''
    });

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
            setAdminLogin(true);
            setTimeout(() => {
                dispatch({ type: 'LOGIN_TRUE' });
                navigate('/home');
            }, 1000);
        }
    }, []);

    const handleSubmit = e => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
        if (inputValue.superAdminEmail === superAdminEmail &&
            inputValue.superAdminPassword === superAdminPassword) {
            setAdminLogin(true);
            setTimeout(() => {
                dispatch({ type: 'LOGIN_TRUE' });
                navigate('/home');
            }, 1000);
        }
        else {
            alert('Wrong Credentials');
            dispatch({ type: 'LOGIN_FALSE' });
            setAdminLogin(false);
        };
        setInputValue({
            superAdminEmail: '',
            superAdminPassword: ''
        });
    }

    return (
        adminLogin ?
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
                            email: shubham@gmail.com
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
                        id='superAdminEmail'
                        value={inputValue.superAdminEmail}
                        errorMsg='Please enter valid email'
                        onChange={handleChange}
                    />
                    <FormInputComponent
                        label='Password'
                        type='password'
                        placeholder='Enter password'
                        id='superAdminPassword'
                        value={inputValue.superAdminPassword}
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
