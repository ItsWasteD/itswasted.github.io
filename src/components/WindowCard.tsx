import { BACKEND_URL } from "../constants";
import type { CalendarWindowType } from "../models/CalendarWindow";

export default function WindowCard({ data }: { data: CalendarWindowType }) {
	return (
		<div
			style={{
				backgroundImage: `url(${BACKEND_URL + "/images/" + data.thumbnailPath})`,
			}}
			className={`${
				data.locked ? "blur-sm" : ""
			} aspect-square bg-contain bg-center rounded-lg shadow-md relative`}
		>
			<div
				className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-wrap font-bold`}
			>
				{data.day + ": " + data.text}
			</div>
		</div>
	);
}
