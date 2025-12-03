import { Navigate, useParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";
import ImageWindow from "./windows/ImageWindow";
import { getRandomString } from "../util/generator";
import { LOCKED_STRINGS } from "../constants";
import TextWindow from "./windows/TextWindow";
import { useEffect } from "react";
import AudioWindow from "./windows/AudioWindow";
import PdfWindow from "./windows/PdfWindow";

export default function WindowRenderer() {
	const { windows, isAdmin, checkAdmin } = useApiContext();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	useEffect(() => {
		checkAdmin();
	}, [checkAdmin]);

	if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 24) {
		return <Navigate to="/" replace />;
	}

	if (!windows) return <p>Loading...</p>;

	const window = windows?.find((w) => w.day === dayNumber);

	if (!window) return <p>Window not found</p>;
	if (import.meta.env.MODE === "production" && window.locked && !isAdmin)
		return <h3 className="text-center text-2xl">{getRandomString(LOCKED_STRINGS)} 🎁</h3>;

	switch (window.type) {
		case "text":
			return <TextWindow data={window} />;
		case "image":
			return <ImageWindow data={window} />;
		case "audio":
			return <AudioWindow data={window} />;
		case "pdf":
			return <PdfWindow data={window} />;
		default:
			return <h1>Unknown window type</h1>;
	}
}
