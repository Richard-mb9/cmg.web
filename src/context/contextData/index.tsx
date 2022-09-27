import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { useSnackbar } from '../notification/useSnackbar';
import axios from 'axios';
import PageLoading from '../../shared/components/PageLoading';
import { SecurityContext } from '../securityContext';
import { useAddressApi, usePersonalDataApi, useTelephoneApi } from '../hooks/integrations';
import { IAddress, IPersonalData, TelephoneType } from '../../utils/interfaces';


interface IDataContext {
    personalData: IPersonalData | undefined;
    setPersonalData: (value: IPersonalData)=>void;
    address: IAddress | undefined;
    setAddress: (value: IAddress)=> void;
    telephones: TelephoneType[];
    setTelephones: (value: TelephoneType[])=>void;
}

export const DataContext = createContext({} as IDataContext);


export default function ContextData({children}: PropsWithChildren<unknown>){
    const [isLoading, setIsLoading] = useState(false);
    const [personalData, setPersonalData] = useState<IPersonalData | undefined>();
    const [address, setAddress] = useState<IAddress | undefined>();
    const [telephones, setTelephones] = useState<TelephoneType[]>([]);

    const [openSnackbar] = useSnackbar();
    const {isAuth, accessToken, tokenData} = useContext(SecurityContext);

    const { readAllPersonalDatabyUserId } = usePersonalDataApi();


    const loadAllPersonalData = async () => {
        if(!isAuth || !!!tokenData) return
        try{
            const data = await readAllPersonalDatabyUserId(tokenData.id)
            if(data){
                setAddress(data.addresses.length ? data.addresses[0] : undefined);
                setTelephones(data.telephones);
                setPersonalData(data.store)
            }
        }
        catch(error: unknown){
            if(axios.isAxiosError(error)){
                openSnackbar("Ocorreu um erro ao busca os seus dados!")
            }
        }
    }

    const loadData = async ()=>{
        setIsLoading(true);
        await loadAllPersonalData();
        setIsLoading(false);
    }

    useEffect(()=>{
        if(!personalData && (tokenData && accessToken)){
            loadData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, accessToken, tokenData])

    return (
        <DataContext.Provider value={
            {
                personalData, 
                setPersonalData,
                address,
                setAddress,
                telephones,
                setTelephones,
            }
        }>
            <PageLoading open={isLoading}/>
            {children}
        </DataContext.Provider>
    )
}
