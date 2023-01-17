import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../../Components/Navigation';
import SideNav from '../../Components/SideNav/SideNav';

function Home() {

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        return <Navigate to="/" />
    }

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
