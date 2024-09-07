import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // Import the Axios instance

interface Task {
	_id: string;
	title: string;
	description: string;
}

const TaskDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [task, setTask] = useState<Task | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const response = await axiosInstance.get(
					`/api/tasks/tasks/${id}`
				);
				setTask(response.data);
			} catch (error) {
				console.error("Failed to fetch task", error);
				navigate("/tasks");
			}
		};

		fetchTask();
	}, [id, navigate]);

	if (!task)
		return <div className="text-center text-gray-500">Loading...</div>;

	return (
		<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
			<h1 className="text-4xl font-extrabold text-gray-900 mb-6">
				{task.title}
			</h1>
			<p className="text-lg text-gray-700 mb-8">{task.description}</p>
			<button
				onClick={() => navigate("/tasks")}
				className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
			>
				Back to Task List
			</button>
		</div>
	);
};

export default TaskDetail;
