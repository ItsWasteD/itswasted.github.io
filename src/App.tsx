import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import { useApiContext } from "./contexts/ApiContext";
import AdminPanel from "./admin/AdminPanel";
import Edit from "./admin/Edit";
import WindowRenderer from "./components/WindowRenderer";
import AdminLogin from "./admin/AdminLogin";
import AuthWrapper from "./components/AuthWrapper";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<HashRouter>
				<AuthWrapper>
					<Routes>
						<Route index element={<Calendar windows={windows} />} />
						<Route
							path="/window/:day"
							element={<WindowRenderer />}
						/>
						<Route path="/admin">
							<Route index element={<AdminPanel />} />
							<Route path="login" element={<AdminLogin />} />
							<Route path="edit/:day" element={<Edit />} />
						</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</AuthWrapper>
			</HashRouter>
		</>
	);
}

export default App;
