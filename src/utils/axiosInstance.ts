// src/utils/axiosInstance.ts
import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
	baseURL: config.apiBaseUrl,
	withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
