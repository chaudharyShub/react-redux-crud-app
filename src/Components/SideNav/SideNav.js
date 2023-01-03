import './SideNav.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideNav() {

    const selector = useSelector(state => state);
    const isUserLogin = selector.userLoginReducer.isUserLogin;

    return (
        <nav className='sidenav_main'>
            <ul className='side_list_container'>
                {
                    isUserLogin ? null : <NavLink to='company'><li>Company</li></NavLink>
                }
                <NavLink to='products'><li>Products</li></NavLink>
            </ul>
        </nav>
    )
}

export default SideNav;
