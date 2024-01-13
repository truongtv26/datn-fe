import axios from 'axios'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


export default instance