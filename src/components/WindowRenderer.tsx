import type { CalendarWindow } from "../models/CalendarWindow";
import ImageWindowCard from "./windows/ImageWindow";

export default function WindowRenderer({ window }: { window: CalendarWindow }) {
	switch (window.type) {
		case "image":
			return <ImageWindowCard data={window} />;
		default:
			return <h1>Unknown window type</h1>;
	}
}
