import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";
import TaskDetail from "./components/Tasks/TaskDetail";
import ProtectedRoute from "./guards/ProtectedRoute";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/tasks"
					element={
						<ProtectedRoute>
							<TaskList />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tasks/:id"
					element={
						<ProtectedRoute>
							<TaskDetail />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
