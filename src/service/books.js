import axios from 'axios';

const getBooks = (data) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${import.meta.env.VITE_API}/books`, data)
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
};
