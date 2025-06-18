import axios from 'axios';

// Create an Axios instance with default configuration
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Base URL from environment variable
    timeout: 1000, // Request timeout in milliseconds
    headers: { 'X-Custom-Header': 'foobar' }, // Example custom header
});

// Add a request interceptor to include Authorization header if token exists
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Ensure headers object exists
            config.headers = config.headers ?? {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default instance;