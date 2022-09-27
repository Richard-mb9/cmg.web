import React, { PropsWithChildren } from 'react';


import SnackbarContextProvider from './notification/snackbar';
import RedirectContextProvider from './redirect/redirect';
import ContextDataProvider from './contextData';
import SecurityContext from './securityContext';
import IntegationContext from './integrationsContext';


export function GlobalContext({children}: PropsWithChildren<unknown>){
    return (
        <RedirectContextProvider>
            <SecurityContext>
                <SnackbarContextProvider>
                    <IntegationContext>
                        <ContextDataProvider>
                            {children}
                        </ContextDataProvider>
                    </IntegationContext>
                </SnackbarContextProvider>
            </SecurityContext>
        </RedirectContextProvider>
        
    )
}