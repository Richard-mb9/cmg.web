import React, { PropsWithChildren } from 'react';

import AuthIntegrationContextProvider  from './auth';
import AddressesIntegrationProvider from './adresses';
import PersonalDataIntegrationProvider from './personalData';
import TelephonesIntegrationProvider from './telephones';
import BaseApiProvider from './baseApi';


export default function IntegationContext({children}: PropsWithChildren<unknown>){
    return (
        <BaseApiProvider>
            <AuthIntegrationContextProvider>
                <AddressesIntegrationProvider>
                    <PersonalDataIntegrationProvider>
                        <TelephonesIntegrationProvider>
                            {children}
                        </TelephonesIntegrationProvider>
                    </PersonalDataIntegrationProvider>
                </AddressesIntegrationProvider>
            </AuthIntegrationContextProvider>
        </BaseApiProvider>
    )
}