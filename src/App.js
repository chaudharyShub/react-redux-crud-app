import Routes from './Routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => (
    <>
        <ToastContainer
            autoClose={2000}
            pauseOnHover={false}
            theme="colored"
        />
        <Routes />
    </>
)

export default App;
