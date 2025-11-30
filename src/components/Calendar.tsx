import { Link } from "react-router-dom";
import type { CalendarWindowType } from "../models/CalendarWindow";
import WindowCard from "./WindowCard";

export default function Calendar({
	windows,
}: {
	windows: CalendarWindowType[] | null;
}) {
	return (
		<>
			<h1 className="text-center text-4xl/loose">Adventskalender</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
				{windows?.map((window, index) =>
					window.locked ? (
						<WindowCard data={window} />
					) : (
						<Link key={index} to={`/window/${window.day}`}>
							<WindowCard data={window} />
						</Link>
					)
				)}
			</div>
		</>
	);
}
