import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import { useApiContext } from "./contexts/ApiContext";
import AdminPanel from "./admin/AdminPanel";
import Edit from "./admin/Edit";
import WindowRenderer from "./components/WindowRenderer";
import { useEffect, useState } from "react";
import AdminLogin from "./admin/AdminLogin";

function App() {
	const { windows, authenticate, isAuthenticated } = useApiContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const hash = window.location.hash.replace("#", "");

		if (!hash) {
			setLoading(false);
			return;
		}

		async function checkAuth() {
			try {
				await authenticate(hash);
			} catch (e) {
				console.error("Authentication failed", e);
			} finally {
				setLoading(false);
			}
		}

		checkAuth();
	}, [authenticate]);

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-5xl font-bold">Am lade...</h1>
			</div>
		);

	if (!isAuthenticated)
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-5xl font-bold">Nüt für dini ouge :)</h1>
			</div>
		);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Calendar windows={windows} />} />
					<Route path="/window/:day" element={<WindowRenderer />} />
					<Route path="/admin">
						<Route index element={<AdminPanel />} />
						<Route path="login" element={<AdminLogin />} />
						<Route path="edit/:day" element={<Edit />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
