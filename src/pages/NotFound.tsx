import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-lg mb-6">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
			>
				Go to Home
			</Link>
		</div>
	);
};

export default NotFound;
