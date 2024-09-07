import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useUser();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(username, password);
			navigate("/tasks");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded shadow-md"
			>
				<h2 className="text-2xl font-bold mb-4">Login</h2>
				<label className="block mb-2">
					<span className="text-gray-700">Username</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</label>
				<label className="block mb-4">
					<span className="text-gray-700">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
