import { Navigate, useParams } from "react-router-dom";
import { useApiContext } from "./contexts/ApiContext";

export default function WindowComponent() {
	const { windows } = useApiContext();
	const { day } = useParams<{ day: string }>();
	const dayNumber = Number(day);

	if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 24) {
		return <Navigate to="/" replace />;
	}

	const window = windows?.find((w) => w.day == Number(day));

	if (!window) return <p>Window not found</p>;
	if (window.locked) return <p>This window is still locked 🎁</p>;

	return (
		<div className="w-1/2 m-auto text-center">
			<h1>{window.day}</h1>
			<img
				className="mx-auto"
				src={
					window.imagePath != "nopath"
						? window.imagePath
						: "https://picsum.photos/400"
				}
			/>
			<p>{window.text}</p>
		</div>
	);
}
