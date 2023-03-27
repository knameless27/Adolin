import axios from 'axios';

const register = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${import.meta.env.VITE_API}/register`, data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const login = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${import.meta.env.VITE_API}/login`, data)
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    register,
    login
};
