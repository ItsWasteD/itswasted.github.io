import Calendar from "./Calendar";
import { useAppContext } from "./contexts/AppContext";

function App() {
	const { windows } = useAppContext();

	return (
		<>
			<h1 className="text-center text-4xl/loose">Welcome</h1>
			<Calendar windows={windows} />
		</>
	);
}

export default App;
