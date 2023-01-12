import './SideNav.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SideNav() {

    const [isUserLogin, setIsUserLogin] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token === "FvMLtjHEGwP1LQMTa0edSxw2pap2") setIsUserLogin(false);
        else setIsUserLogin(true);
    }, []);

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
