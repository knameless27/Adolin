import axios from 'axios';

const getBooks = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Auth': `${token}`
        };
        axios
            .get(`${import.meta.env.VITE_API}/books`, {
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
            .post(`${import.meta.env.VITE_API}/books`, data, {
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

const editBooks = (id, data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .put(`${import.meta.env.VITE_API}/books/${id}`, data, {
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

const deleteBooks = (id) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .delete(`${import.meta.env.VITE_API}/books/${id}`,{
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

const searchBooks = (data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Auth': `${token}`
        };
        axios.post(`${import.meta.env.VITE_API}/search/books`, data, {
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
const makeReservation = (data) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Auth': `${token}`
        };
        axios.post(`${import.meta.env.VITE_API}/books/save`, data, {
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
    getBooks,
    searchBooks,
    makeReservation,
    addCategory,
    editBooks,
    deleteBooks
};
