import jwtDecode from 'jwt-decode';


export const isAuthenticated = !!localStorage.getItem('accessToken');

interface ITokenData {
    id: number;
    email: string;
    profile: string[];
    roles: string[];
}

const getToken = () => {
    return localStorage.getItem('accessToken');
}

const getTokenData = (): ITokenData | undefined =>{
    const token = getToken()
    if (token){
        return jwtDecode(token) as ITokenData;
    }
}

export const getIdFromToken = ()=>{
    const token = getToken()
    if (token){
        const tokenData = jwtDecode(token) as ITokenData;
        if(tokenData.id){
            return tokenData.id;
        }
    }
    return 0;
}

export const getEmailFromToken = ()=>{
    const token = getToken()
    if (token){
        const tokenData = jwtDecode(token) as ITokenData;
        if(tokenData.email){
            return tokenData.email;
        }
    }
    return '';
}

export const hasRole = (roleName: string)=> {
    const tokenData = getTokenData()
    if (tokenData){
        const roles = tokenData.roles;
        return roles.indexOf(roleName) >= 0;
    }
    return false
    
}