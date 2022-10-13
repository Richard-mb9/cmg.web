import React, { createContext ,useContext, PropsWithChildren } from 'react';
import { BaseApiContext } from './baseApi';
import { IAddress, IPersonalData, IProduct, IProductCategories, TelephoneType } from '../../utils/interfaces';
import axios from 'axios';
import { useSnackbar } from '../notification/useSnackbar';

interface ICreateAndUpdatePersonalData {
    cnpj?: string;
    corporateName?: string;
    name?: string;
    description?: string;
}

interface IAllPersonalData {
    addresses: IAddress[];
    telephones: TelephoneType[];
    store: IPersonalData;
    products: IProduct[];
    productsCategories: IProductCategories[];
}


interface IPersonalDataIntegrationContext {
    createAndUpdatePersonalData: (data: ICreateAndUpdatePersonalData)=> Promise<IPersonalData | undefined>;
    readPersonalData: (id: number)=> Promise<IPersonalData | undefined>;
    updateImageStore: (storeId: number, image: File)=> Promise<IPersonalData | undefined>;
    readAllPersonalDatabyUserId: (userId: number) => Promise<IAllPersonalData | undefined>;
}

export const PersonalDataIntegrationContext = createContext({} as IPersonalDataIntegrationContext);

export default function PersonalDataIntegration({children}: PropsWithChildren<unknown>){
    const { api } = useContext(BaseApiContext);
    const [openSnackbar] = useSnackbar();

    async function createAndUpdatePersonalData(data: ICreateAndUpdatePersonalData){
        try{
            const response = await api.post<IPersonalData>('/stores', JSON.parse(JSON.stringify(data)));
            return response.data
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar a nova Descrição")
            }
        }
        
    }
    
    const readPersonalData = async (userId: number) => {
        try{
            const response = await api.get<IPersonalData>(`/stores/user/${userId}`);
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response?.status >= 400 && error.response?.status !== 404){
                    openSnackbar("Houve um erro ao carregar seus dados pessoais");
                }
                else if (error.response.status === 404) {
                    try {
                        const response = await createAndUpdatePersonalData({})
                        if(response){
                            return response;
                        }
                    }
                    catch(error: unknown){
                        openSnackbar("Houve um erro ao carregar seus dados pessoais");
                    }
                }
                
            }
        }
        
    }
    
    
    async function updateImageStore(storeId: number, image: File){
        try{
            const data = new FormData();
            data.append('image',image)
            const response = await api.put<IPersonalData>(
                `/stores/${storeId}/image`, 
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar a nova Imagem")
            }
        }
        
    }

    async function readAllPersonalDatabyUserId(userId: number){
        try{
            const response = await api.get<IAllPersonalData>(`/stores/user/${userId}/all-data`)
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos buscar os seus dados")
            }
        }
    }

    return (
        <PersonalDataIntegrationContext.Provider
            value={{
                createAndUpdatePersonalData,
                readPersonalData,
                updateImageStore,
                readAllPersonalDatabyUserId
            }}
        >
            {children}
        </PersonalDataIntegrationContext.Provider>
    )
}

