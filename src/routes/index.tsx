import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';

import AuthRoutes from '../modules/auth/pages/routes';
import DashboardRoutes from '../modules/dashboard/pages/routes';

/* type Props = {
    children?: JSX.Element
}

const PrivateRoute = (props: any)=>{
    const isAuth = ()=> false;
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'
    if(!isAuth() && !isLoginPage){
        return <Navigate to='/login'/>
    }
    return props.children
} */

export default function DefaultRoutes(){
    return (
            <BrowserRouter>
                <DashboardRoutes/>
                <AuthRoutes/>
            </BrowserRouter>
    )
}