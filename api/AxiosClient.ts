import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://10.10.3.64:8080", // process.env.API_BASE_URL,
})
