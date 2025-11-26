import { useEffect } from "react";
import { useApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
	const { windows, isAdmin, refreshWindows } = useApiContext();
	const navigate = useNavigate();

	useEffect(() => {
		refreshWindows();
	}, []);

	return (
		<div className="min-h-full">
			<header className="relative bg-gray-600 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold tracking-tight text-white">
						Admin Panel (isAdmin: {isAdmin ? "true" : "false"})
					</h1>
				</div>
			</header>
			<main>
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="max-h-full overflow-x-auto rounded border border-gray-300 shadow-sm dark:border-gray-600">
						<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
							<thead className="sticky top-0 bg-white ltr:text-left rtl:text-right dark:bg-gray-900">
								<tr className="*:font-medium *:text-gray-900 dark:*:text-white">
									<th className="px-3 py-2 whitespace-nowrap">
										Day
									</th>
									<th className="px-3 py-2 whitespace-nowrap">
										Text
									</th>
									<th className="px-3 py-2 whitespace-nowrap">
										ImagePath
									</th>
									<th className="px-3 py-2 whitespace-nowrap">
										Locked
									</th>
									<th className="px-3 py-2 whitespace-nowrap">
										Opened
									</th>
									<th className="px-3 py-2 whitespace-nowrap">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								{windows?.map((window) => {
									return (
										<tr
											key={window.day}
											className="*:text-gray-900 *:first:font-medium dark:*:text-white"
										>
											<td className="px-3 py-2 whitespace-nowrap">
												{window.day}
											</td>
											<td className="px-3 py-2 whitespace-nowrap">
												{window.text}
											</td>
											<td className="px-3 py-2 whitespace-nowrap">
												{window.thumbnailPath}
											</td>
											<td className="px-3 py-2 whitespace-nowrap">
												{window.locked
													? "true"
													: "false"}
											</td>
											<td className="px-3 py-2 whitespace-nowrap">
												{window.opened
													? "true"
													: "false"}
											</td>
											<td className="px-3 py-2 whitespace-nowrap">
												<div
													className="inline-flex rounded-md shadow-xs"
													role="group"
												>
													<button
														type="button"
														className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
														onClick={() =>
															navigate(
																`edit/${window.day}`
															)
														}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
															/>
														</svg>
													</button>
													<button
														type="button"
														className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
															/>
														</svg>
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</div>
	);
}
