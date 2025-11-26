import { BACKEND_URL } from "../../constants";
import type { ImageWindow } from "../../models/CalendarWindow";

export default function ImageWindowCard({ data }: { data: ImageWindow }) {
	return (
		<div
			style={{
				backgroundImage: `url(${
					BACKEND_URL + "/images/" + data.content.imagePath
				})`,
			}}
			className={`${
				data.locked ? "blur-sm" : ""
			} aspect-square bg-contain bg-center rounded-lg shadow-md relative`}
		>
			<div
				className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-wrap font-bold`}
			>
				{data.day + ": " + data.content.text}
			</div>
		</div>
	);
}
