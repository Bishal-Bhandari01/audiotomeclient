import axios from 'axios';

const apiEndPoint = "http://localhost:8080/api/v1/bookmark";

export function AddBookMark(data) {
    return new Promise(function (resolve, reject) {
        axios.post(`${apiEndPoint}/addBookmark`, data, {
            header: {
                common: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authentication",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Referrer-Policy": "no-referrer"
                }
            }
        })
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    })
}