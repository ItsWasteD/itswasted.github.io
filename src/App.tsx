import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import { useApiContext } from "./contexts/ApiContext";
import WindowComponent from "./components/WindowComponent";
import AdminPanel from "./admin/AdminPanel";
import Edit from "./admin/Edit";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Calendar windows={windows} />} />
					<Route path="/window/:day" element={<WindowComponent />} />
					<Route path="/admin">
						<Route index element={<AdminPanel />} />
						<Route path="edit/:day" element={<Edit />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
