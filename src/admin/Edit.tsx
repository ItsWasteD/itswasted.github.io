import { useParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";

export default function Edit() {
	const { windows } = useApiContext();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	const window = windows?.find((w) => w.day == dayNumber);

	if (!window) return <p>Window not found</p>;

	const updateWindow = () => {
		// WIP
	};

	return (
		<div className="mx-auto w-1/3 flex flex-col items-center">
			<h1 className="text-center text-3xl">Day: {dayNumber}</h1>
			<label htmlFor="text" className="block text-sm/6 font-medium text-white">
				Text
			</label>
			<input
				id="text"
				type="text"
				name="text"
				value={window.text}
				className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
			/>
			<label htmlFor="imagePath" className="block text-sm/6 font-medium text-white">
				Image Path
			</label>
			<input
				id="imagePath"
				type="text"
				name="imagePath"
				value={window.imagePath}
				className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
			/>
			<label id="opened" htmlFor="opened" className="block text-sm/6 font-medium text-white">
				Opened
			</label>
			<input type={"checkbox"} checked={window.opened} name="opened" />
			<br />
			<button
				type="button"
				onClick={updateWindow}
				className="w-1/3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Save
			</button>
		</div>
	);
}
