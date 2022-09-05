import axios from 'axios';

const baseUrl = 'http://172.27.242.35:5000'

const API = axios.create({
    baseURL: baseUrl,
    headers:{}
})

export default API