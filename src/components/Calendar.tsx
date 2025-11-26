import { Link } from "react-router-dom";
import type { CalendarWindow } from "../models/CalendarWindow";
import WindowRenderer from "./WindowRenderer";

export default function Calendar({
	windows,
}: {
	windows: CalendarWindow[] | null;
}) {
	return (
		<>
			<h1 className="text-center text-4xl/loose">Adventskalender</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
				{windows?.map((window, index) =>
					window.locked ? (
						<WindowRenderer window={window} />
					) : (
						<Link key={index} to={`/window/${window.day}`}>
							<WindowRenderer window={window} />
						</Link>
					)
				)}
			</div>
		</>
	);
}
