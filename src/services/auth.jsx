import instance from '../core/api'

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
        if (localStorage.getItem('authToken')) {
            const response = await instance.post(`/logout`, null, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('authToken') },
            });
            return response.data;
        }
        return false;
    } catch (error) {
        return null;
    }
}
export const getUser = async () => {
    try {
        if (localStorage.getItem('authToken')) {
            const response = await instance.get(`/user`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });

            if (response.status === 200) {
                return response.data.data;
            }

            return response
        }
        return {}
    } catch (error) {
        return {}
    }
}

