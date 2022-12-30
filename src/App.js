import Routes from './Components/Others/Routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkLogin = (adminOrUser, typeTrue, typeFalse, url) => {
        const a = localStorage.getItem(adminOrUser);
        if (a === null) {
            dispatch({ type: typeFalse });
            navigate('/');
            return;
        }
        if (a === 'true') {
            setTimeout(() => {
                dispatch({ type: typeTrue });
                navigate(`/${url}`);
            }, 1000);
        }
        else {
            dispatch({ type: typeFalse });
            navigate('/');
        }
    }

    useEffect(() => {
        checkLogin('isAdminLogin', 'LOGIN_TRUE', 'LOGIN_FALSE', 'admin');
        checkLogin('isUserLogin', 'USER_LOGIN_TRUE', 'USER_LOGIN_FALSE', 'user');
    }, []);

    return <Routes />
}

export default App;
