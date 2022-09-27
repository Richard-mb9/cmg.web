import React, { useContext } from 'react';
import { SecurityContext } from '.';


export default function useToken(){
    const { accessToken } = useContext(SecurityContext);

    return accessToken;
}