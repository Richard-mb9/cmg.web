import React from 'react'
import Login from './login'
import Register from './register'

import {Routes} from 'react-router-dom';
import Route from '../../../routes/route';

export default function(){
    return (
        <>
            <Route element={<Register/>} path='/register' />
            <Route element={<Login/>} path='/login' />
        </>
    )
}