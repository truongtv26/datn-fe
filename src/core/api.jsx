import axios from 'axios'
import Cookies from 'js-cookie';

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken')}`;

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})


export default instance