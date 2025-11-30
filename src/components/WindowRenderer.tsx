import { Navigate, useParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";
import ImageWindow from "./windows/ImageWindow";
import { getRandomString } from "../util/generator";
import { LOCKED_STRINGS } from "../constants";
import TextWindow from "./windows/TextWindow";

export default function WindowRenderer() {
	const { windows } = useApiContext();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 24) {
		return <Navigate to="/" replace />;
	}

	const window = windows?.find((w) => w.day === dayNumber);

	if (!window) return <p>Window not found</p>;
	if (window.locked) return <h3 className="text-center text-2xl">{getRandomString(LOCKED_STRINGS)} 🎁</h3>;

	console.log(window);
	switch (window.type) {
		case "text":
			return <TextWindow data={window} />;
		case "image":
			return <ImageWindow data={window} />;
		default:
			return <h1>Unknown window type</h1>;
	}
}
