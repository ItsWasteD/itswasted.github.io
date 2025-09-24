import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import { useApiContext } from "./contexts/ApiContext";
import WindowComponent from "./WindowComponent";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<h1 className="text-center text-4xl/loose">Welcome</h1>
			<BrowserRouter>
				<Routes>
					<Route index element={<Calendar windows={windows} />} />
					<Route path="/window/:day" element={<WindowComponent />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
