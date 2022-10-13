import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { useSnackbar } from '../notification/useSnackbar';
import axios from 'axios';
import PageLoading from '../../shared/components/PageLoading';
import { SecurityContext } from '../securityContext';
import { usePersonalDataApi } from '../hooks/integrations';
import { IAddress, IPersonalData, TelephoneType, IProduct, IProductCategories } from '../../utils/interfaces';


interface IDataContext {
    personalData: IPersonalData | undefined;
    setPersonalData: (value: IPersonalData)=>void;
    address: IAddress | undefined;
    setAddress: (value: IAddress)=> void;
    telephones: TelephoneType[];
    setTelephones: (value: TelephoneType[])=>void;
    products: IProduct[];
    setProducts: (value: IProduct[]) => void;
    productCategories: IProductCategories[];
    setProductCategories: (value: IProductCategories[]) => void;
    currentStoreId: number | undefined;
    setCurrentStoreId: (value: number) => void;
}

export const DataContext = createContext({} as IDataContext);


export default function ContextData({children}: PropsWithChildren<unknown>){
    const [isLoading, setIsLoading] = useState(false);
    const [personalData, setPersonalData] = useState<IPersonalData | undefined>();
    const [address, setAddress] = useState<IAddress | undefined>();
    const [telephones, setTelephones] = useState<TelephoneType[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productCategories, setProductCategories] = useState<IProductCategories[]>([]);
    const [currentStoreId, setCurrentStoreId] = useState<number | undefined>()

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
                setProducts(data.products);
                setProductCategories(data.productsCategories);
                setCurrentStoreId(data.store.id);
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
                products,
                setProducts,
                productCategories,
                setProductCategories,
                currentStoreId,
                setCurrentStoreId
            }
        }>
            <PageLoading open={isLoading}/>
            {children}
        </DataContext.Provider>
    )
}
