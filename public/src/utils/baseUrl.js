import axios from "axios"


export const placeholderApi = axios.create({
    baseURL: "http://localhost:8000/"
})