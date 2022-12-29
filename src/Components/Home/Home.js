import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SideNav from '../SideNav/SideNav';

function Home() {

    return (
        <div>
            <div className='app_main'>
                <div className="app_sidenav">
                    <SideNav />
                </div>
                <div className='right_content'>
                    <Navigation />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Home;
