import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // Use the Axios instance
import { useUser } from "../../context/UserContext"; // Import the user context

interface Task {
	_id: string;
	title: string;
	description: string;
}

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");
	const [newTaskDescription, setNewTaskDescription] = useState<string>("");
	const { isAuthenticated } = useUser();

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axiosInstance.get("/api/tasks/tasks");
				setTasks(response.data);
			} catch (error) {
				console.error("Failed to fetch tasks", error);
			}
		};

		if (isAuthenticated) {
			fetchTasks();
		}
	}, [isAuthenticated]);

	const handleCreateTask = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await axiosInstance.post("/api/tasks/tasks", {
				title: newTaskTitle,
				description: newTaskDescription,
			});

			setNewTaskTitle("");
			setNewTaskDescription("");

			// Fetch tasks again to update the list
			const response = await axiosInstance.get("/api/tasks/tasks");
			setTasks(response.data);
		} catch (error) {
			console.error("Failed to create task", error);
		}
	};

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<h1 className="text-4xl font-extrabold mb-8 text-gray-900">
				Task List
			</h1>
			<form
				onSubmit={handleCreateTask}
				className="bg-white p-6 rounded-lg shadow-md mb-8"
			>
				<h2 className="text-2xl font-semibold mb-6 text-gray-800">
					Create New Task
				</h2>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Title
					</label>
					<input
						type="text"
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Description
					</label>
					<textarea
						value={newTaskDescription}
						onChange={(e) => setNewTaskDescription(e.target.value)}
						className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
				>
					Create Task
				</button>
			</form>
			<ul className="space-y-6">
				{tasks.map((task) => (
					<li
						key={task._id}
						className="bg-white p-4 rounded-lg shadow-md"
					>
						<Link
							to={`/tasks/${task._id}`}
							className="text-lg font-semibold text-blue-600 hover:underline"
						>
							{task.title}
						</Link>
						<p className="text-gray-600 mt-2">{task.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
