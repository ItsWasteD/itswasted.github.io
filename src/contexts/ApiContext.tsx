import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { CalendarWindow } from "../models/CalendarWindow";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type ApiContextType = {
	windows: CalendarWindow[] | null;
	refreshWindows: () => Promise<void>;
	loading: boolean;
	error: string | null;
};

const ApiContext = createContext<ApiContextType | null>(null);

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

	const getWindows = async () => {
		setLoading(true);

		try {
			const res = await fetch(`${BACKEND_URL}/api/windows`);

			if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

			const windows = await res.json();
			setWindows(windows);
		} catch (err: any) {
			setError(err.message ?? "Failed to load windows");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getWindows();
	}, []);

	const apiContextValue: ApiContextType = {
		windows,
		refreshWindows: getWindows,
		loading,
		error,
	};

	return (
		<ApiContext.Provider value={apiContextValue}>
			{children}
		</ApiContext.Provider>
	);
};
