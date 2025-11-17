import { useParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";
import { useEffect, useMemo, useState } from "react";
import { updateWindowById } from "../services/WindowService";

export default function Edit() {
	const { windows, refreshWindows } = useApiContext();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	const window = windows?.find((w) => w.day == dayNumber);

	const [text, setText] = useState(window?.text ?? "");
	const [imagePath, setImagePath] = useState(window?.imagePath ?? "");
	const [opened, setOpened] = useState(window?.opened ?? 0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (window) {
			setText(window.text);
			setImagePath(window.imagePath);
			setOpened(window.opened);
		}
	}, [window]);

	const updateWindow = async () => {
		setLoading(true);
		setError(null);

		try {
			const success = await updateWindowById({
				id: window!.id,
				text: text,
				imagePath: imagePath,
				opened: opened,
			});
			if (success) await refreshWindows();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	if (!window) return <p>Window not found</p>;

	return (
		<div className="mx-auto w-1/3 flex flex-col items-center">
			<h1 className="text-center text-3xl">Day: {dayNumber}</h1>
			<label
				htmlFor="text"
				className="block text-sm/6 font-medium text-white"
			>
				Text
			</label>
			<input
				id="text"
				type="text"
				name="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
			/>
			<label
				htmlFor="imagePath"
				className="block text-sm/6 font-medium text-white"
			>
				Image Path
			</label>
			<input
				id="imagePath"
				type="text"
				name="imagePath"
				value={imagePath}
				onChange={(e) => setImagePath(e.target.value)}
				className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
			/>
			<label
				id="opened"
				htmlFor="opened"
				className="block text-sm/6 font-medium text-white"
			>
				Opened
			</label>
			<input
				type={"checkbox"}
				checked={opened ? true : false}
				onChange={(e) => setOpened(e.target.checked ? 1 : 0)}
				name="opened"
			/>
			<br />
			{error && <div className="text-red-500">{error}</div>}
			<button
				type="button"
				onClick={updateWindow}
				disabled={loading}
				className="w-1/3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				{loading ? "Saving..." : "Save"}
			</button>
		</div>
	);
}
