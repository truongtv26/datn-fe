import instance from '../core/api'
import Cookies from 'js-cookie'

export const register = async (user) => {
    try {
        const response = await instance.post(`/register`, user)
        return response.data
    } catch (error) {
        return error.response
    }
}
export const login = async (user) => {
    try {
        const response = await instance.post(`/login`, user)
        return response.data
    } catch (error) {
        return error.response
    }
}
export const logout = async () => {
    try {
        const authToken = Cookies.get('authToken');

        if (!authToken) {
            return null;
        }

        const response = await instance.post(`/logout`, null, {
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}
export const getUser = async () => {
    try {
        const response = await instance.get(`/user`, {
            headers: { 'Authorization': 'Bearer ' + Cookies.get('authToken') },
        })
        if (response.status === 200) {
            return response.data.data
        }
        return response
    } catch (error) {
        return error.response
    }
}

