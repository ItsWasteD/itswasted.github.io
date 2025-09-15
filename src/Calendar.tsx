import type { CalendarWindow } from "./models/CalendarWindow";
import WindowCard from "./WindowCard";

export default function Calendar({ windows }: { windows: CalendarWindow[] }) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
			{windows.map((window) => (
				<WindowCard data={window} />
			))}
		</div>
	);
}
