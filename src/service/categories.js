import axios from 'axios';

const getCategories = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const headers = {
            Auth: `${token}`
        };
        axios
            .get(`${import.meta.env.VITE_API}/categories`, {
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
            Auth: `${token}`
        };
        axios
            .post(`${import.meta.env.VITE_API}/search/books`, data, {
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
            Auth: `${token}`
        };
        axios
            .post(`${import.meta.env.VITE_API}/books/save`, data, {
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
    searchBooks,
    makeReservation
};
