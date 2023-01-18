import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormInputComponent from '../../Components/FormInputComponent';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import './Login.css';


function Login() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState({});

    const notify = (msg) => toast.error(msg);

    const handleChange = e => {
        const { value, id } = e.target;
        setInputValue(prev => ({
            ...prev,
            [id]: value
        }));
    }

    const checkLogin = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token === 'FvMLtjHEGwP1LQMTa0edSxw2pap2') navigate('/admin');
        else if (token) navigate('/user');
    }

    const logInWithEmailAndPassword = () => {
        setShowLoader(true);
        signInWithEmailAndPassword(auth, inputValue.loginEmail, inputValue.loginPassword)
            .then(userCredential => {
                const user = userCredential.user;
                if (user.uid === 'FvMLtjHEGwP1LQMTa0edSxw2pap2') {
                    localStorage.setItem('token', JSON.stringify(user.uid));
                    navigate('/admin');
                }
                else if (user.uid) {
                    localStorage.setItem('token', JSON.stringify(user.uid));
                    localStorage.setItem('companyEmail', JSON.stringify(user.email));
                    navigate('/user');
                }
                else return;
                setShowLoader(false);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                notify(errorMessage);
                setTimeout(() => {
                    navigate('/');
                }, 100);
            });
    }

    const handleSubmit = e => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.preventDefault();
            setValidated(true);
            return;
        }
        logInWithEmailAndPassword()
        setInputValue({});
    }

    useEffect(() => {
        checkLogin();
    }, []);


    return (
        showLoader ?
            <Loader />
            :
            <>
                <ToastContainer
                    autoClose={3000}
                    pauseOnHover={false}
                    theme="colored"
                />
                {/* <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            admin: shubham@gmail.com
                            password: 123456
                        </Tooltip>
                    }
                >
                    <Button className='details_tooltip' variant="link">Login details</Button>
                </OverlayTrigger> */}
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
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder='Enter password'
                        id='loginPassword'
                        value={inputValue.loginPassword}
                        errorMsg='Please enter password'
                        onChange={handleChange}
                    />
                    <Form.Check
                        type='checkbox'
                        htmlFor='showHidePassword'
                        id='showHidePassword'
                        label={`${showPassword ? 'Hide' : 'Show'} password`}
                        className='my-3'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <Button variant="dark" className='mt-2 w-100' type='submit'>
                        Login
                    </Button>
                </Form>
            </>
    );
}

export default Login;
