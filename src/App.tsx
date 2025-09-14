import { useAppContext } from "./contexts/AppContext";

function App() {
	const { windows } = useAppContext();

	const text = ["One", "Two", "Three", "Four", "Five", "Six"];

	return (
		<>
			<h1 className="text-center text-4xl/loose mx-64">Welcome</h1>
			<div className="grid grid-cols-4 gap-4">
				{windows.map((window) => (
					<div key={window.nr} className="flex flex-col items-center">
						<h2>{window.text}</h2>
						<h4>David</h4>
						<h4>Samuel</h4>
						<img src={window.image} />
					</div>
				))}
			</div>
		</>
	);
}

export default App;
