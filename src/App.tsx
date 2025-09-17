import Calendar from "./Calendar";
import { useApiContext } from "./contexts/ApiContext";

function App() {
	const { windows } = useApiContext();

	return (
		<>
			<h1 className="text-center text-4xl/loose">Welcome</h1>
			<Calendar windows={windows} />
		</>
	);
}

export default App;
