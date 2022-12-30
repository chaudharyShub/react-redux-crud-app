import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Company from '../Company/Company';
import Products from '../Products/Products';
import Home from '../Home/Home';
import Login from '../Login/Login';

function Routes() {

    const routes = useRoutes([
        {
            path: '/',
            children:
                [
                    {
                        path: '',
                        element: <Navigate replace to='login' />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },

                ]
        },
        {
            path: '/admin',
            element: <Home />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to='company' />
                },
                {
                    path: 'company',
                    element: <Company />
                },
                {
                    path: 'products',
                    element: <Products />
                }
            ]
        },
        {
            path: '/user',
            element: <Home />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to='products' />
                },
                {
                    path: 'products',
                    element: <Products />
                }
            ]
        },
    ]);

    return routes;
}

export default Routes;
