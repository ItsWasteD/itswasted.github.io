import { useNavigate, useParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";
import { useEffect, useState } from "react";
import { updateWindowById } from "../services/WindowService";
import { WINDOW_TYPES, type WindowType } from "../models/CalendarWindow";

export default function Edit() {
	const { windows, refreshWindows } = useApiContext();
	const navigate = useNavigate();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	const window = windows?.find((w) => w.day == dayNumber);

	const [text, setText] = useState(window?.text ?? "");
	const [thumbnailPath, setThumbnailPath] = useState(
		window?.thumbnailPath ?? ""
	);
	const [opened, setOpened] = useState(window?.opened ?? 0);
	const [type, setType] = useState(window?.type);
	const [content, setContent] = useState(JSON.stringify(window?.content));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (window) {
			setText(window.text);
			setThumbnailPath(window.thumbnailPath);
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
				thumbnailPath: thumbnailPath,
				opened: opened,
				type: type,
				content: JSON.parse(content),
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
		<>
			<button
				className="bg-blue-500 py-2 px-4"
				onClick={() => navigate("/admin")}
			>
				Back
			</button>
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
					Thumbnail Path
				</label>
				<input
					id="thumbnailPath"
					type="text"
					name="thumbnailPath"
					value={thumbnailPath}
					onChange={(e) => setThumbnailPath(e.target.value)}
					className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
				/>
				<label
					htmlFor="opened"
					className="block text-sm/6 font-medium text-white"
				>
					Opened
				</label>
				<input
					id="opened"
					type={"checkbox"}
					checked={opened ? true : false}
					onChange={(e) => setOpened(e.target.checked ? 1 : 0)}
					name="opened"
				/>
				<label
					htmlFor="type"
					className="block text-sm/6 font-medium text-white"
				>
					Type
				</label>
				<select
					id="type"
					className="bg-black"
					name="type"
					onChange={(e) => setType(e.target.value as WindowType)}
				>
					{WINDOW_TYPES.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
				<label
					htmlFor="content"
					className="block text-sm/6 font-medium text-white"
				>
					Content
				</label>
				<textarea
					id="content"
					name="content"
					onChange={(e) => setContent(e.target.value)}
				>
					{content}
				</textarea>
				<br />
				{error && (
					<>
						<div className="text-red-500">{error}</div>
						<br />
					</>
				)}
				<button
					type="button"
					onClick={updateWindow}
					disabled={loading}
					className="w-1/3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					{loading ? "Saving..." : "Save"}
				</button>
			</div>
		</>
	);
}
