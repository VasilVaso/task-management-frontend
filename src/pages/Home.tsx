import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold mb-6">
				Welcome to Task Management App
			</h1>
			<p className="text-lg mb-4">
				Manage your tasks efficiently and stay organized.
			</p>
			<div className="space-x-4">
				<Link
					to="/tasks"
					className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
				>
					View Tasks
				</Link>
				<Link
					to="/login"
					className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Home;
