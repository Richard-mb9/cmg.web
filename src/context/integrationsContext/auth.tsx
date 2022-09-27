import React, { createContext ,useContext, PropsWithChildren } from 'react';
import { BaseApiContext } from './baseApi';
import { AxiosResponse } from 'axios';

interface ICreateUserStore {
    email: string;
    profiles: string[];
    password: string;
}

interface IAuth {
    email: string,
    password: string
}

interface ICreateUserResponse {
    id: number;
}

interface IAuthIntegrationContext {
    createUserStore: (data: ICreateUserStore)=> Promise<AxiosResponse<ICreateUserResponse, any>>;
    getToken: (user: IAuth)=> Promise<AxiosResponse<any, any>>
}

export const AuthIntegrationContext = createContext({} as IAuthIntegrationContext);

export default function AuthIntegration({children}: PropsWithChildren<unknown>){
    const { authApi } = useContext(BaseApiContext)

    async function createUserStore(data: ICreateUserStore){
        return authApi.post<ICreateUserResponse>('/users', data)
    }
    
    async function getToken(user: IAuth){
        return await authApi.post('/auth', user)
    }

    return (
        <AuthIntegrationContext.Provider
            value={{
                createUserStore,
                getToken
            }}
        >
            {children}
        </AuthIntegrationContext.Provider>
    )
}