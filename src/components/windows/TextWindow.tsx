import type { TextWindowType } from "../../models/CalendarWindow";

export default function TextWindow({ data }: { data: TextWindowType }) {
	return (
		<div className="w-1/2 m-auto text-center">
			<p>{data.text}</p>
		</div>
	);
}
