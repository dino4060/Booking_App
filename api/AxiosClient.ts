import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://10.215.90.67:8080", // process.env.API_BASE_URL,
})
