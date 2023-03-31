import axios from 'axios';

const getCategories = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .get(`${import.meta.env.VITE_API}/users`, {
                headers: headers
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const searchCategories = (data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .post(`${import.meta.env.VITE_API}/search/users`, data, {
                headers: headers
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const addCategory = (data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .post(`${import.meta.env.VITE_API}/users`, data, {
                headers: headers
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const editCategory = (id, data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .put(`${import.meta.env.VITE_API}/users/${id}`, data, {
                headers: headers
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .delete(`${import.meta.env.VITE_API}/users/${id}`,{
                headers: headers
            })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    getCategories,
    searchCategories,
    addCategory,
    deleteCategory,
    editCategory
};
