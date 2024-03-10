import axios from "axios";

const API_HOST = "http://localhost:3001";
//const API_HOST = "https://suhoihn-backend-e4140594264a.herokuapp.com/";

const axiosApi = axios.create({
    baseURL: API_HOST,
    timeout: 10000
});

// // Intercepts the request and does something (but nothing is done as the config is returned right away)
// axios.interceptors.request.use(function (config){
//     return config;
// });

// axiosApi.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject(error)
// );

export async function get(url, config){
    return await axiosApi.get(url, {
        ...config,
    }).then((response) => response.data);
};

export async function post(url, config){
    return await axiosApi.post(url, config, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => response.data);
};