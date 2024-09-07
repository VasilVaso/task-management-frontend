import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

interface UserContextType {
	isAuthenticated: boolean;
	user: any; // Adjust type as needed
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<any>(null); // Adjust type as needed

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("authToken");
			if (!token) {
				setIsAuthenticated(false);
				setUser(null);
				return;
			}

			try {
				const response = await axios.get(
					`${config.apiBaseUrl}/api/auth/verify`,
					{ withCredentials: true }
				);
				setIsAuthenticated(true);
				setUser(response.data.user); // Adjust based on your response structure
			} catch {
				setIsAuthenticated(false);
				setUser(null);
			}
		};

		checkAuth();
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await axios.post(
				`${config.apiBaseUrl}/api/auth/login`,
				{ username, password },
				{ withCredentials: true }
			);
			setIsAuthenticated(true);
			setUser(response.data.user); // Adjust based on your response structure
			localStorage.setItem("authToken", response.data.token); // Save token
		} catch (error) {
			console.error("Login failed", error);
			setIsAuthenticated(false);
			setUser(null);
		}
	};

	const logout = () => {
		axios
			.post(
				`${config.apiBaseUrl}/api/auth/logout`,
				{},
				{ withCredentials: true }
			)
			.then(() => {
				localStorage.removeItem("authToken"); // Remove token on logout
				setIsAuthenticated(false);
				setUser(null);
			})
			.catch((error) => console.error("Logout failed", error));
	};

	return (
		<UserContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
