import React, { PropsWithChildren } from 'react';

import AuthIntegrationContextProvider  from './auth';
import AddressesIntegrationProvider from './adresses';
import PersonalDataIntegrationProvider from './personalData';
import TelephonesIntegrationProvider from './telephones';
import BaseApiProvider from './baseApi';
import ProductsIntegrationProvider from './products';
import ProductsCategoriesProvider from './productCategories';


export default function IntegationContext({children}: PropsWithChildren<unknown>){
    return (
        <BaseApiProvider>
            <AuthIntegrationContextProvider>
                <AddressesIntegrationProvider>
                    <PersonalDataIntegrationProvider>
                        <TelephonesIntegrationProvider>
                            <ProductsIntegrationProvider>
                                <ProductsCategoriesProvider>
                                    {children}
                                </ProductsCategoriesProvider>
                            </ProductsIntegrationProvider>
                        </TelephonesIntegrationProvider>
                    </PersonalDataIntegrationProvider>
                </AddressesIntegrationProvider>
            </AuthIntegrationContextProvider>
        </BaseApiProvider>
    )
}