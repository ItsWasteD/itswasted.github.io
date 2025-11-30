import { useSearchParams } from "react-router-dom";
import { useApiContext } from "../contexts/ApiContext";
import { useEffect, useState } from "react";

export default function AuthWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [searchParams, _] = useSearchParams();
	const token = searchParams.get("token") || "";

	const { authenticate, isAuthenticated } = useApiContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!token) {
			setLoading(false);
			return;
		}

		(async () => {
			try {
				await authenticate(token);
			} catch (e) {
				console.error("Authentication failed", e);
			} finally {
				setLoading(false);
			}
		})();
	}, [authenticate, token]);

	if (loading)
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-5xl font-bold">Am lade...</h1>
			</div>
		);

	if (!isAuthenticated)
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-5xl font-bold">Nüt für dini ouge :)</h1>
			</div>
		);

	return <>{children}</>;
}
