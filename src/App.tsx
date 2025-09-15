import { useEffect } from "react";
import Calendar from "./Calendar";
import { useApiContext } from "./contexts/ApiContext";
import { useAppContext } from "./contexts/AppContext";

function App() {
	const { windows } = useAppContext();
	const { getWindows } = useApiContext();

	useEffect(() => {
		(async () => {
			const windows = await getWindows();
			console.log(windows);
		})();
	}, []);

	return (
		<>
			<h1 className="text-center text-4xl/loose">Wellcome</h1>
			<Calendar windows={windows} />
		</>
	);
}

export default App;
