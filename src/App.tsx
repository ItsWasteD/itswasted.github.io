import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import { useApiContext } from "./contexts/ApiContext";
import WindowComponent from "./WindowComponent";
import AdminPanel from "./admin/AdminPanel";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Calendar windows={windows} />} />
					<Route path="/window/:day" element={<WindowComponent />} />
					<Route path="/admin" element={<AdminPanel />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
