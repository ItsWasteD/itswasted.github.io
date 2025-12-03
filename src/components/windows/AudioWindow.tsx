import type { AudioWindowType } from "../../models/CalendarWindow";

export default function AudioWindow({ data }: { data: AudioWindowType }) {
	return <p>AudioWindow {data.text}</p>;
}
