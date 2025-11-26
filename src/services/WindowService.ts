import { BACKEND_URL } from "../constants";
import type { CalendarWindowType } from "../models/CalendarWindow";

export async function fetchWindows(): Promise<CalendarWindowType[]> {
	const res = await fetch(`${BACKEND_URL}/api/windows`);

	if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

	return await res.json();
}

export async function updateWindowById(
	window: CalendarWindowType
): Promise<boolean> {
	fetch(`${BACKEND_URL}/api/windows/${window.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...window,
			opened: window.opened ? true : false,
		}),
	})
		.then(async (res) => {
			if (res.status === 204) {
				console.log("Window updated successfully!");
				return true;
			} else if (res.status === 404) {
				console.error("Window not found");
			} else if (res.status === 409) {
				console.error("ID mismatch");
			} else {
				const errorData = await res.json();
				console.error("Error:", errorData);
			}
		})
		.catch((err) => {
			console.error("Network error:", err);
		});

	return false;
}
