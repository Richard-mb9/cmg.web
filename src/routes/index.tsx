import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import Dashboard from '../modules/dashboard/pages';
import PageLogin from '../modules/auth/pages/login';
import PageRegister from '../modules/auth/pages/register';


export default function DefaultRoutes(){

    const createPrivateElement = (element: JSX.Element)=>{
        if(!!localStorage.getItem('accessToken')){
            return element
        }
        else return <Navigate  to={"/login"}/>
    }

    return (
            <BrowserRouter>
                <Routes>
                    <Route element={createPrivateElement(<Dashboard/>)} path='/*'/>
                    <Route element={<PageRegister/>} path='/register'/>
                    <Route element={<PageLogin/>} path='/login' />
                </Routes>
            </BrowserRouter>
    )
}