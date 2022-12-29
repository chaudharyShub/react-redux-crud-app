import Routes from './Components/Others/Routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLogin = localStorage.getItem('isAdminLogin');
        if (isAdminLogin === null) {
            dispatch({ type: 'LOGIN_FALSE' });
            navigate('/');
            return;
        }
        if (isAdminLogin === 'true') {
            setTimeout(() => {
                dispatch({ type: 'LOGIN_TRUE' });
                navigate('/home');
            }, 1000);
        } else {
            dispatch({ type: 'LOGIN_FALSE' });
            navigate('/');
        }
    }, []);

    return <Routes />
}

export default App;
