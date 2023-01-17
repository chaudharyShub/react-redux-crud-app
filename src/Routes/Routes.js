import React, { lazy } from 'react';
import { useRoutes, Navigate, Outlet } from 'react-router-dom';


const LazyHome = lazy(() => import('../Pages/Home/Home'));
const LazyLogin = lazy(() => import('../Pages/Login/Login'));
const LazyCompany = lazy(() => import('../Pages/Company/Company'));
const LazyProducts = lazy(() => import('../Pages/Products/Products'));
const LazyProductsDetails = lazy(() => import('../Pages/Products/ProductDetails/ProductsDetails'));


function Routes() {

    const routes = useRoutes([
        {
            path: "/",
            element: <Navigate to="/login" />
        },
        {
            path: "/login",
            element: <LazyLogin />
        },
        {
            path: '/admin',
            element: <LazyHome />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to='company' />
                },
                {
                    path: 'company',
                    element: <LazyCompany />
                },
                {
                    path: 'products',
                    element: <Outlet />,
                    children: [
                        {
                            path: '',
                            element: <LazyProducts />,
                        },
                        {
                            path: ':id',
                            element: <LazyProductsDetails />
                        },
                    ]
                },
            ]
        },
        {
            path: '/user',
            element: <LazyHome />,
            children: [
                {
                    path: '',
                    element: <Navigate replace to='products' />
                },
                {
                    path: 'products',
                    element: <Outlet />,
                    children: [
                        {
                            path: '',
                            element: <LazyProducts />,
                        },
                        {
                            path: ':id',
                            element: <LazyProductsDetails />
                        },
                    ]
                },
            ]
        },
    ]);

    return routes;
}

export default Routes;

