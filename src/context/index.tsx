import React, { PropsWithChildren } from 'react';


import SnackbarContextProvider from './notification/snackbar';
import RedirectContextProvider from './redirect/redirect';


export function GlobalContext({children}: PropsWithChildren<unknown>){
    return (
        <RedirectContextProvider>
            <SnackbarContextProvider>
                {children}
            </SnackbarContextProvider>
        </RedirectContextProvider>
        
    )
}