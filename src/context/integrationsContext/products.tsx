import React, { createContext, useContext, PropsWithChildren } from 'react';
import axios from 'axios';
import { useSnackbar } from '../notification/useSnackbar';
import { BaseApiContext } from './baseApi';
import { IProduct } from '../../utils/interfaces';
import { removeNullAndUndefinedFromObject } from '../../utils';


interface ICreateProductRequest {
    storeId: number;
    imageUrl?: string;
    image?: File;
    name: string;
    description?: string;
    price: number;
    availableDelivery: boolean;
    availableStore: boolean;
    categoriesIds: number[]
}

interface IUpdateProductRequest {
    image?: File;
    name?: string;
    description?: string;
    price?: number;
    availableDelivery?: boolean;
    availableStore?: boolean;
    categoriesIds?: number[];
}

interface ICreateProductResponse {
    id: number;
}

interface IUpdateProductImageResponse {
    imageUrl: string;
}

interface IProductsIntegrationContext {
    createProduct: (product: ICreateProductRequest)=>Promise<ICreateProductResponse | undefined>;
    listByStoreId: (storeId: number) => Promise<IProduct[]>;
    updateProduct: (productId: number, dataToUpdate: IUpdateProductRequest) => Promise<boolean>;
    updateProductImage: (productId: number, image: File) => Promise<IUpdateProductImageResponse | undefined>;
    deleteProduct: (productId: number) => Promise<boolean>;
}

export const ProductsIntegrationContext = createContext({} as IProductsIntegrationContext);

export default function ProductsIntegration({children}: PropsWithChildren<unknown>){
    const { api } = useContext(BaseApiContext);
    const [openSnackbar] = useSnackbar();

    async function createProduct(product: ICreateProductRequest){
        
        const data = removeNullAndUndefinedFromObject(product);
        console.log(product)

        try{
            const response = await api.post<ICreateProductResponse>('/products', data)
            
            if(response.data && !!product.image){
                try{
                    await updateProductImage(response.data.id, product.image);
                }
                catch(error: unknown){
                    if(axios.isAxiosError(error) && error.response){
                        openSnackbar("Os dados do produto forão salvos, mas não conseguimos salvar a foto");
                    }
                }
            }

            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 403){
                    openSnackbar("Você não tem permissão para criar produtos");
                }
                else{
                    openSnackbar("Não conseguimos Salvar o Produto");
                }
            }
        }
    }

    async function updateProductImage(productId: number, image: File){
        try{
            const data = new FormData();
            data.append('image',image)
            const response = await api.put<IUpdateProductImageResponse>(
                `/products/${productId}/image`, 
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Não conseguimos salvar a foto")
            }
        }
    }

    async function listByStoreId(storeId: number){
        try{
            const response = await api.get<IProduct[]>(`/products/stores/${storeId}`);
            return response.data;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                openSnackbar("Houve um erro para listar os produtos");
            }
        }
        return [];
    }

    async function updateProduct(productId: number, dataToUpdate: NonNullable<IUpdateProductRequest>){
        const data = removeNullAndUndefinedFromObject(dataToUpdate);
        try{
            await api.put(`/products/${productId}`, data);
            if(dataToUpdate.image){
                await updateProductImage(productId, dataToUpdate.image);
            }
            return true;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 403){
                    openSnackbar("Você não tem permissão para alterar produtos");
                }
                else{
                    openSnackbar("Não conseguimos Salvar as alterações");
                }
            }
        }
        return false;
    }

    async function deleteProduct(productId: number){
        try{
            await api.delete(`/products/${productId}`);
            return true;
        }
        catch(error: unknown){
            if(axios.isAxiosError(error) && error.response){
                if(error.response && error.response.status === 403){
                    openSnackbar("Você não tem permissão para excluir este produto!");
                }
                else{
                    openSnackbar("Não conseguimos Salvar as alterações");
                }
            }
        }
        return false;
    }

    return (
        <ProductsIntegrationContext.Provider
            value={{
                createProduct,
                listByStoreId,
                updateProduct,
                updateProductImage,
                deleteProduct,
            }}
        >
            {children}
        </ProductsIntegrationContext.Provider>
    )
}
