import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
instance.interceptors.response.use(function (response) {
    return response
}, function (err, response) {
    return Promise.reject(err);
})
export default instance