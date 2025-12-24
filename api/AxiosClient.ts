import axios from "axios"

export const axiosClient = axios.create({
	baseURL: "http://10.20.3.248:8080", // process.env.API_BASE_URL,
})
