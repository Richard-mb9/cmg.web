import API from './baseApi';


interface IUser {
    email: string,
    password: string
}

export async function createUser(user: IUser){
    return  await API.post('/users', user)
}

export async function getToken(user: IUser){
    return await API.post('/auth', user)
}