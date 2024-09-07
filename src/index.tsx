import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import "./styles/tailwind.css"; // Import your Tailwind CSS
import App from "./App";
import { UserProvider } from "./context/UserContext";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Render the app
root.render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);
