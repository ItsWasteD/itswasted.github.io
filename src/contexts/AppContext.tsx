import { createContext, useContext, useMemo, type ReactNode } from "react";
import { rawWindows, type CalendarWindow } from "../models/CalendarWindow";

type AppContextType = {
	windows: CalendarWindow[];
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used inside an AppProvider");
	}
	return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const currentDate = new Date().getDate();
	const windows = useMemo(() => {
		return rawWindows.map((window) => ({
			...window,
			//locked: window.nr + 1 >= currentDate,
		}));
	}, [rawWindows]);

	return (
		<AppContext.Provider value={{ windows }}>
			{children}
		</AppContext.Provider>
	);
};
