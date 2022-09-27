import React, { createContext ,useContext, PropsWithChildren } from 'react';
import { BaseApiContext } from './baseApi';
import axios from 'axios';
import { TelephoneType } from '../../utils/interfaces';
import { useSnackbar } from '../notification/useSnackbar';

export interface ICreateTelephone {
    ddd: string;
    number: string;
}

interface ICretaTelephoneResponse {
    id: number
}

interface ITelephonesIntegrationContext {
    listTelephones: ()=> Promise<TelephoneType[]>;
    createTelephone: (data: ICreateTelephone)=> Promise<ICretaTelephoneResponse | undefined>;
    updateTelephone: (dataToUpdate: TelephoneType)=> Promise<TelephoneType | undefined>;
    deleteTelephone: (telephoneId: number)=> Promise<boolean>;
    batchDeleteTelephone: (telephoneIds: number[])=> Promise<boolean>;
}

export const TelephonesIntegrationContext = createContext({} as ITelephonesIntegrationContext);


export default function TelephonesIntegration({children}: PropsWithChildren<unknown>){
    const { api } = useContext(BaseApiContext)
    const [openSnackbar] = useSnackbar()

    async function listTelephones(){
        try{
            const response = await api.get<TelephoneType[]>('/telephones');
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response && error.response.status >= 400){
                openSnackbar('Houve um erro para listar seus telefones');
            }
        }
        return []
    }
    
    async function createTelephone(data: ICreateTelephone){
        try{
            const response = await api.post<ICretaTelephoneResponse>('/telephones', data);
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response && error.response.status >= 400){
                openSnackbar('Houve um erro para salvar seus telefones');
            }
        }
    }
    
    
    async function updateTelephone(dataToUpdate: TelephoneType){
        try{
            const response = await api.put<TelephoneType>(`/telephones/${dataToUpdate.id}`, 
                {
                    ddd: dataToUpdate.ddd, 
                    number: dataToUpdate.number
                }
            );
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response && error.response.status >= 400){
                openSnackbar('Houve um erro para salvar as alterações');
            }
        }
        
    }
    
    
    async function deleteTelephone(telephoneId: number){
        try {
            await api.delete(`/telephones/${telephoneId}`);
            return true;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response && error.response.status >= 400){
                openSnackbar('Houve um erro para excluir seu telefone');
            }
        }
        return false
    }
    
    async function batchDeleteTelephone(telephoneIds: number[]){
        try{
            await api.delete('/telephones/batch', {params: {ids: telephoneIds.join(',')}});
            return true;
        }   
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response && error.response.status >= 400){
                openSnackbar('Houve um erro para excluir alguns dados');
            }
        }
        return false;
    }


    return (
        <TelephonesIntegrationContext.Provider
            value={{
                createTelephone,
                listTelephones,
                updateTelephone,
                deleteTelephone,
                batchDeleteTelephone
            }}
        >
            {children}
        </TelephonesIntegrationContext.Provider>
    )
}