import axios from 'axios';

const baseUrl = 'http://localhost:5000'
const access_token = localStorage.getItem('access_token')
//const baseUrl = process.env.URL_AUTH_API


const API = axios.create({
    baseURL: baseUrl,
    headers:{'authorization': `Bearer ${access_token}`}
})


interface ICreateUserStore {
    email: string;
    profiles: string[];
    password: string;
}

interface IAuth {
    email: string,
    password: string
}


export async function createUserStore(data: ICreateUserStore){
    return API.post('/users', data)
}

export async function getToken(user: IAuth){
    return await API.post('/auth', user)
}