import { createContext, useContext, type ReactNode } from "react";
import type { CalendarWindow } from "../models/CalendarWindow";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type ApiContextType = {
	getWindows: () => Promise<CalendarWindow[]>;
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
	const getWindows = async () => {
		const res = await fetch(`${BACKEND_URL}/api/windows`);

		if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

		return res.json();
	};

	const apiContextValue: ApiContextType = {
		getWindows,
	};

	return (
		<ApiContext.Provider value={apiContextValue}>
			{children}
		</ApiContext.Provider>
	);
};
