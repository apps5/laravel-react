import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://react-laravel-app.local/api',
    withCredentials: true,
});

export default axiosInstance;
