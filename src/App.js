import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation/Navigation';
import SideNav from './Components/SideNav/SideNav';
import Element from './Components/Others/Element';
import { Provider } from 'react-redux'
import { store } from './Redux/store';

function App() {

  return (
    <Provider store={store}>
      <div className='app_main'>
        <div className="app_sidenav">
          <SideNav home="Home" />
        </div>
        <div className='right_content'>
          <Navigation />
          <Element />
        </div>
      </div>
    </Provider>
  );
}

export default App;
