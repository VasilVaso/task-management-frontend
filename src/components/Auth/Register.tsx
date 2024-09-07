import React, { useState } from "react";
import { register } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		try {
			await register(username, password);
			navigate("/login");
		} catch (error) {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded shadow-md"
			>
				<h2 className="text-2xl font-bold mb-4">Register</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<label className="block mb-2">
					<span className="text-gray-700">Username</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</label>
				<label className="block mb-2">
					<span className="text-gray-700">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</label>
				<label className="block mb-4">
					<span className="text-gray-700">Confirm Password</span>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</label>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
