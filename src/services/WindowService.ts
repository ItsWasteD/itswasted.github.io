import { BACKEND_URL } from "../constants";
import type { CalendarWindowType } from "../models/CalendarWindow";

export async function fetchWindows(): Promise<CalendarWindowType[]> {
	const res = await fetch(`${BACKEND_URL}/api/windows`, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

	const data: (Omit<CalendarWindowType, "content"> & { content: string | null })[] = await res.json();

	return data.map((item) => {
		let content: CalendarWindowType["content"] | undefined;

		// Only parse if it's a string
		if (item.content) {
			try {
				content = JSON.parse(item.content) as CalendarWindowType["content"];
			} catch {
				content = undefined; // fallback if JSON is invalid
			}
		}

		return {
			...item,
			content,
		} as CalendarWindowType;
	});
}

export async function updateWindowById(window: CalendarWindowType): Promise<boolean> {
	const res = await fetch(`${BACKEND_URL}/api/windows/${window.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...window,
			content: JSON.stringify(window.content),
			opened: window.opened ? true : false,
		}),
		credentials: "include",
	});

	if (res.status === 204) {
		console.log("Window updated successfully!");
		return true;
	} else if (res.status === 404) {
		console.error("Window not found");
	} else if (res.status === 409) {
		console.error("ID mismatch");
	} else {
		const errorData = await res.text();
		throw new Error(errorData);
	}

	return false;
}
