import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import { useApiContext } from "./contexts/ApiContext";
import AdminPanel from "./admin/AdminPanel";
import Edit from "./admin/Edit";
import WindowRenderer from "./components/WindowRenderer";
import { useEffect, useState } from "react";

function App() {
	const { windows, authenticate } = useApiContext();
	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const hash = window.location.hash.replace("#", "");

		if (!hash) {
			setLoading(false);
			setAuthenticated(false);
			return;
		}

		async function checkAuth() {
			try {
				const isValid = await authenticate(hash);
				setAuthenticated(isValid);
			} catch (e) {
				console.error("Authentication failed", e);
				setAuthenticated(false);
			} finally {
				setLoading(false);
			}
		}

		checkAuth();
	}, [authenticate]);

	if (loading) return <div>Am lade...</div>;
	if (!authenticated) return <div>Nüt für dini ouge ;)</div>;

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
