import React, { createContext, useContext, PropsWithChildren, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from '../notification/useSnackbar';
import { BaseApiContext } from './baseApi';
import { IProductCategories } from '../../utils/interfaces';
import ModalInfo from '../../shared/components/ModalInfo';


interface ICreateProductCategoryRequest {
    storeId: number;
    name: string;
}

interface IUpdateProductCategoryRequest {
    id: number;
    name: string;
}

interface ICreateProductCategoryResponse {
    id: number;
}


interface IProductCategoriesIntegration {
    listProductCategoriesByStoreId: (storeId: number) => Promise<IProductCategories[]>;
    createProductCategory: (data: ICreateProductCategoryRequest) => Promise<ICreateProductCategoryResponse | undefined>;
    deleteProductCategory: (categoryId: number) => Promise<boolean>;
    updateProductCategory: (data: IUpdateProductCategoryRequest) => Promise<boolean>;
}

export const ProductCategoriesIntegrationContext = createContext(({} as IProductCategoriesIntegration));


export default function ProductCategoriesIntegration({children}: PropsWithChildren<unknown>){
    const { api } = useContext(BaseApiContext);
    const [openSnackbar] = useSnackbar();

    const [openModalInfo, setOpenModalInfo] = useState(false);

    async function listProductCategoriesByStoreId(storeId: number) {
        try{
            const response = await api.get<IProductCategories[]>(`products-categories/stores/${storeId}`);
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Houve um problema ao listar as categorias");
            }
        }
        return [];
    }

    async function createProductCategory(data: ICreateProductCategoryRequest) {
        try{
            const response = await api.post<ICreateProductCategoryResponse>(
                '/products-categories',
                data
            )
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 409){
                    openSnackbar('ja existe uma categoria de produto com este nome');
                }
                else if(error.response && error.response.status === 403){
                    openSnackbar('Voce não tem permissão para criar categorias de produtos');
                }
                else {
                    openSnackbar("Houve um problema ao Salvar esta categoria");
                }
            }
        }
    }

    async function deleteProductCategory(categoryId: number): Promise<boolean>{
        try{
            await api.delete(`/products-categories/${categoryId}`)
            return true;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 403){
                    openSnackbar('Voce não tem permissão para deletar categorias de produtos');
                }
                else if(error.response && error.response.status === 400){
                    openSnackbar('Não Salvamos as alterações');
                    if((error.response.data as {error?: string}).error as string=== 'there are products linked to this category!'){
                        setOpenModalInfo(true);
                    }
                }
                else {
                    openSnackbar("Houve um problema ao deletar a categoria");
                }
            }
            return false;
        }
    }

    async function updateProductCategory(data: IUpdateProductCategoryRequest){
        const {id, name} = data;
        try{
            await api.put(`/products-categories/${id}`,{name})
            return true;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 409){
                    openSnackbar('ja existe uma categoria de produto com este nome');
                }
                else if(error.response && error.response.status === 403){
                    openSnackbar('Voce não tem permissão para atualizar categorias de produtos');
                }
                else {
                    openSnackbar("Houve um problema ao Salvar as alterações");
                }
            }
            return false;
        }
    }

    return (
        <ProductCategoriesIntegrationContext.Provider
            value={{
                listProductCategoriesByStoreId,
                createProductCategory,
                deleteProductCategory,
                updateProductCategory
            }}
        >
            <ModalInfo 
                open={openModalInfo}
                setOpen={setOpenModalInfo}
                message={"Esta categoria possui produtos vinculados a ela, para exclui-la desvincule todos os produtos dela!"}
            />
            {children}
        </ProductCategoriesIntegrationContext.Provider>
    )
}