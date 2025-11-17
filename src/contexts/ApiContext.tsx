import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { CalendarWindow } from "../models/CalendarWindow";
import { BACKEND_URL } from "../constants";
import { fetchWindows } from "../services/WindowService";

type ApiContextType = {
	windows: CalendarWindow[] | null;
	isAdmin: boolean | null;
	refreshWindows: () => Promise<void>;
	refreshIsAdmin: () => Promise<void>;
	authenticateAdmin: (password: string) => Promise<boolean>;
	loading: boolean;
	error: string | null;
};

const ApiContext = createContext<ApiContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useApiContext = () => {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error("useApiContext must be used inside and ApiProvider");
	}

	return context;
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
	const [windows, setWindows] = useState<CalendarWindow[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

	const getWindows = async () => {
		try {
			setLoading(true);
			const data = await fetchWindows();
			setWindows(data);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	const getAdmin = async () => {
		const res = await fetch(`${BACKEND_URL}/api/admin`, {
			credentials: "include",
		});

		if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

		const data = await res.json();
		setIsAdmin(data.admin === true);
	};

	const authenticateAdmin = async (password: string) => {
		const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password: password }),
			credentials: "include",
		});

		if (res.ok) {
			await getAdmin();
			return true;
		}
		return false;
	};

	useEffect(() => {
		getWindows();
		//getAdmin();
	}, []);

	const apiContextValue: ApiContextType = {
		windows,
		isAdmin,
		authenticateAdmin: authenticateAdmin,
		refreshWindows: getWindows,
		refreshIsAdmin: getAdmin,
		loading,
		error,
	};

	return (
		<ApiContext.Provider value={apiContextValue}>
			{children}
		</ApiContext.Provider>
	);
};
