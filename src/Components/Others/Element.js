import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import EmptyHome from './EmptyHome';
import Company from '../Company/Company';
import Products from '../Products/Products';

function Element() {

    const routes = useRoutes([
        {
            path: '/',
            element: <EmptyHome />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to="company" />
                },
                {
                    path: '/company',
                    element: <Company />
                },
                {
                    path: '/products',
                    element: <Products />
                },
            ]
        },
    ]);

    return routes;
}

export default Element
