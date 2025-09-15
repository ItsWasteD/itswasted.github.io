import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./contexts/AppContext.tsx";
import { ApiProvider } from "./contexts/ApiContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<ApiProvider>
				<App />
			</ApiProvider>
		</AppProvider>
	</StrictMode>
);
