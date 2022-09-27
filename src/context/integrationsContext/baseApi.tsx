import React, { createContext, PropsWithChildren, useContext } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { SecurityContext } from '../securityContext';


interface IIntegrationsContext {
    api: AxiosInstance;
    authApi: AxiosInstance;
}

export const BaseApiContext = createContext({} as IIntegrationsContext);


export default function BaseApi({children}: PropsWithChildren<unknown>){
    const { accessToken } = useContext(SecurityContext);

    const createApi = (baseUrl: string)=>{
        const instance = axios.create({
            baseURL: baseUrl,
            headers:{'authorization': `Bearer ${accessToken}`}
        })

        instance.interceptors.response.use((response: AxiosResponse)=>{
            if (
                response.data &&
                response.headers['content-type'] === 'application/json'
              ) {
                response.data = camelizeKeys(response.data);
              }
            
              return response;
        });

        instance.interceptors.request.use((config: AxiosRequestConfig)=>{
            const newConfig = { ...config };
            newConfig.url = `api/${config.url}`;

            if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data')
                return newConfig;

            if (config.params) {
                newConfig.params = decamelizeKeys(config.params);
            }

            if (config.data) {
                newConfig.data = decamelizeKeys(config.data);
            }

            return newConfig;
        });

        return instance;
    }


    const api = createApi('http://localhost:5001');

    const authApi = createApi('http://localhost:5000');

    return (
        <BaseApiContext.Provider value={{api, authApi}}>
            {children}
        </BaseApiContext.Provider>
    )

}