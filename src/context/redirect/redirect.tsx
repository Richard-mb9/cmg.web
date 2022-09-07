import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { Navigate, BrowserRouter } from 'react-router-dom';

const defaultValueContext = {
    navigate: (path: string, props?: object) => {},
}


export const RedirectContext = createContext(defaultValueContext);

export default function SnackBar({children}: PropsWithChildren<unknown>){
    const [path, setPath] = useState("/");
    const [redirect, setRedirect] = useState(false);
    const [props, setProps] = useState({})

    const navigate = (newPath: string, sendProps: object= {})=>{
        setPath(newPath);
        setProps(sendProps)
        setRedirect(true);
    }
    
    useEffect(()=>{
        setRedirect(false);
    }, [path]);

    const teste = (
        <BrowserRouter>
            <Navigate to={path} state={props}/>
        </BrowserRouter>
    )
    
    return (
        <RedirectContext.Provider value={{navigate}}>
            { redirect ? teste: children }
        </RedirectContext.Provider>
    )

} 
