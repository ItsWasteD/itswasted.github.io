import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import { useApiContext } from "./contexts/ApiContext";
import AdminPanel from "./admin/AdminPanel";
import Edit from "./admin/Edit";
import WindowRenderer from "./components/WindowRenderer";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Calendar windows={windows} />} />
					<Route path="/window/:day" element={<WindowRenderer />} />
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
