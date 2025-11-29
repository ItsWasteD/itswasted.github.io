import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { CalendarWindowType } from "../models/CalendarWindow";
import { BACKEND_URL } from "../constants";
import { fetchWindows } from "../services/WindowService";

type ApiContextType = {
	windows: CalendarWindowType[] | null;
	refreshWindows: () => Promise<void>;
	isAuthenticated: boolean;
	authenticate: (uuid: string) => Promise<boolean>;
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
	const [windows, setWindows] = useState<CalendarWindowType[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setAuthenticated] = useState(false);

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

	const authenticate = useCallback(async (uuid: string) => {
		const res = await fetch(`${BACKEND_URL}/api/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ uuid: uuid }),
			credentials: "include",
		});

		setAuthenticated(res.ok);
		return res.ok;
	}, []);

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
			// TODO
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (isAuthenticated) {
			getWindows();
		}
	}, [isAuthenticated]);

	const apiContextValue: ApiContextType = {
		windows,
		refreshWindows: getWindows,
		isAuthenticated,
		authenticate: authenticate,
		authenticateAdmin: authenticateAdmin,
		loading,
		error,
	};

	return <ApiContext.Provider value={apiContextValue}>{children}</ApiContext.Provider>;
};
