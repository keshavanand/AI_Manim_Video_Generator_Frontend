import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})

instance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance;