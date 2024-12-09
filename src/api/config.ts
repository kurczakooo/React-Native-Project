import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/',
    //baseURL: 'http://127.0.0.1:3000',
    timeout: 1000
});
