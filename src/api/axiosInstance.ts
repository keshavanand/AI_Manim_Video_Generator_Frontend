import { useAuthStore, useGlobalAuthCheck } from '@/store/states';
import axios from 'axios';

// Create an Axios instance with default configuration
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Base URL from environment variable
    //timeout: 1000, // Request timeout in milliseconds
    headers: { 'X-Custom-Header': 'foobar' }, // Example custom header
});


// Add a request interceptor to include Authorization header if token exists
instance.interceptors.request.use(
    (config) => {
        const { token, alpha_token } = useAuthStore.getState(); // ✅ Correct usage
        // const token = localStorage.getItem("token")
        // const alpha_token = localStorage.getItem("alpha_token")
        if (token) {
            // Ensure headers object exists
            config.headers = config.headers ?? {};
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['alpha-token'] = alpha_token;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const detail = error.response.data?.detail;
            if (detail === 'expired') useGlobalAuthCheck.getState().setIsTokExpired(true);
            }
            return Promise.reject(error);
    }
)

export default instance;