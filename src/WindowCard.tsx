import type { CalendarWindow } from "./models/CalendarWindow";

export default function WindowCard({ data }: { data: CalendarWindow }) {
	return (
		<div
			style={{ backgroundImage: `url(${data.image})` }}
			className={`${
				data.locked ? "blur-sm" : ""
			} aspect-square bg-cover bg-center rounded-lg shadow-md relative`}
		>
			<div
				className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center text-wrap font-bold`}
			>
				{data.text}
			</div>
		</div>
	);
}
