import axios from "axios"

const API_HOST = "http://localhost:3001";

const axiosApi = axios.create({
    baseURL: API_HOST,
    timeout: 10000
})


axios.interceptors.request.use(function (config){
    return config;
})

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

// url: /users/register, /users/save
export async function get(url, config){
    return await axiosApi.get(url, {
        ...config,
    }).then((response) => response.data);
};

export async function post(url, config){
    return await axiosApi.post(url, {
        ...config,
    }).then((response) => response.data)
};