import React, { createContext ,useContext, PropsWithChildren } from 'react';
import { BaseApiContext } from './baseApi';
import { AxiosResponse } from 'axios';
import { IAddress } from '../../utils/interfaces';
import { useSnackbar } from '../notification/useSnackbar';
import axios from 'axios';

interface ICreateAndUpdateAdress {
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
    cep: string;
}

interface ICreateAddressResponse {
    id: number;
}

interface IAddressIntegrationContext {
    createAdress: (adresse: ICreateAndUpdateAdress) => Promise<ICreateAddressResponse | undefined>;
    readAddress: () => Promise<IAddress[]>;
    updateAddress: (addressId: number ,address: ICreateAndUpdateAdress) => Promise<IAddress | undefined>;
}

export const AddressIntegrationContext = createContext({} as IAddressIntegrationContext);

export default function AddressesIntegration({children}: PropsWithChildren<unknown>){

    const { api } = useContext(BaseApiContext)
    const [openSnackbar] = useSnackbar();


    async function createAdress(adresse: ICreateAndUpdateAdress){
        try{
            const response = await api.post<ICreateAddressResponse>('/adresses', JSON.parse(JSON.stringify(adresse)));
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar o seu endereço")
            }
        }
        
    }
    
    async function readAddress(){
        try{
            const response = await api.get<IAddress[]>('/adresses');
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos buscar o seu endereço")
            }
        }
        return [];
        
    }
    
    async function updateAddress(addressId: number ,address: ICreateAndUpdateAdress){
        try{
            const response = await api.put<IAddress>(`/adresses/${addressId}`, JSON.parse(JSON.stringify(address)));
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar as alterações")
            }
        }
    }

    return (
        <AddressIntegrationContext.Provider
            value={{
                createAdress,
                readAddress,
                updateAddress,
            }}
        >
            {children}
        </AddressIntegrationContext.Provider>
    )
}


