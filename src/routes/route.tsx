import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'


type Props = {
    element: JSX.Element;
    path: string;
    isPrivate?: boolean;
}


export default function ({ element, path, isPrivate, ...rest }: Props) {
    const isAuth = ()=> false;
    const location = useLocation()

    if(!isAuth() && isPrivate && location.pathname === path){
        return <Navigate to={'/login'}/>
    } 

    return (
        <Routes>
            <Route {...rest} element={element} path={path} />
        </Routes>
    )
}