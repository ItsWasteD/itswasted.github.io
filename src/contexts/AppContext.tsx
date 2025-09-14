import { createContext, useContext, type ReactNode } from "react";
import type { Window } from "../models/Window";

type AppContextType = {
	windows: Window[];
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used inside an AppProvider");
	}
	return context;
};

const windows: Window[] = [
	{
		nr: 1,
		text: "Hallo",
		image: "https://cdn2.thecatapi.com/images/5ov.jpg",
		opened: false,
		locked: false,
	},
	{
		nr: 2,
		text: "Welt",
		image: "https://cdn2.thecatapi.com/images/1p2.jpg",
		opened: false,
		locked: false,
	},
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<AppContext.Provider value={{ windows }}>
			{children}
		</AppContext.Provider>
	);
};
