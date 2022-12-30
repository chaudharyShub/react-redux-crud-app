import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SideNav from '../SideNav/SideNav';

function Home() {

    const selector = useSelector(state => state);
    const isUserLogin = selector.userLoginReducer.isUserLogin;

    return (
        <div>
            <div className='app_main'>
                {
                    isUserLogin ? null :
                        <div className="app_sidenav">
                            <SideNav />
                        </div>
                }
                <div style={{ width: isUserLogin ? '100%' : '' }} className='right_content'>
                    <Navigation />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Home;
