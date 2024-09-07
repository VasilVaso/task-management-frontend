import axios from "axios";
import config from "../config/config";

export const login = async (username: string, password: string) => {
	const response = await axios.post(
		`${config.apiBaseUrl}/api/auth/login`,
		{ username, password },
		{ withCredentials: true }
	);
	const { token } = response.data;

	// Save the token to local storage
	localStorage.setItem("authToken", token);

	return token;
};

export const register = async (username: string, password: string) => {
	await axios.post(`${config.apiBaseUrl}/api/auth/register`, {
		username,
		password,
	});
};
