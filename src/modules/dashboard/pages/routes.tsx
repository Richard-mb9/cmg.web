import React from 'react';

import Route from '../../../routes/route';

import Dashboard  from './index';

export default function(){
    return <Route element={<Dashboard/>} path='/dashboard/*'/>
}