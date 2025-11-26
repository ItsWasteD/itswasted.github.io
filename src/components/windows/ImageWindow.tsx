import { BACKEND_URL } from "../../constants";
import type { ImageWindowType } from "../../models/CalendarWindow";

export default function ImageWindow({ data }: { data: ImageWindowType }) {
	return (
		<div className="w-1/2 m-auto text-center">
			<h1>{data.day}</h1>
			<img
				className="mx-auto"
				src={
					data.thumbnailPath != "nopath"
						? `${BACKEND_URL + "/images/" + data.thumbnailPath}`
						: "https://picsum.photos/400"
				}
			/>
			<p>{data.text}</p>
		</div>
	);
}
