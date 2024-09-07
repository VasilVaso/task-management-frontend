import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated } = useUser();

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
