import React, { useState, useEffect, createContext, PropsWithChildren } from 'react';
import jwtDecode from 'jwt-decode';


interface ITokenData {
    id: number;
    email: string;
    profile: string[];
    roles: string[];
}


interface ISecurityContext {
    isAuth: boolean;
    setIsAuth: (value: boolean)=>void;
    accessToken?: string;
    setAccessToken: (value: string)=>void;
    tokenData?: ITokenData;
    setTokenData: (value: ITokenData)=>void;
}


export const SecurityContext = createContext({} as ISecurityContext);

export default function Security({children}: PropsWithChildren<unknown>){
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'));
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [tokenData, setTokenData] = useState<ITokenData | undefined>();

    useEffect(()=>{
        if(isAuth && accessToken){
            setTokenData(jwtDecode(accessToken));
        }
        else if (isAuth && !!!accessToken && !!localStorage.getItem('access_token')){
            setAccessToken(localStorage.getItem('access_token') as string)
        }
        else{
            setAccessToken(undefined);
        }
    }, [isAuth, accessToken]);

    return (
        <SecurityContext.Provider value={{
            isAuth,
            setIsAuth,
            accessToken,
            setAccessToken,
            tokenData,
            setTokenData,
        }}>
            {children}
        </SecurityContext.Provider>
    )
}