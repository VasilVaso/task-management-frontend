import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

	console.log("useAuth", isAuthenticated);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.get(
					`${config.apiBaseUrl}/api/auth/verify`,
					{
						withCredentials: true,
					}
				);

				if (response.status === 200) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error("Auth check failed:", error);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	return { isAuthenticated };
};
