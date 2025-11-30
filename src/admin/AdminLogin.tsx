import { useState, type FormEvent } from "react";
import { useApiContext } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
	const { authenticateAdmin } = useApiContext();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const isAdmin = await authenticateAdmin(password);

		if (!isAdmin) {
			setError("Wrong password");
			return;
		}

		navigate("/admin");
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto flex flex-col max-w-md h-100 justify-center">
			<input
				type="password"
				placeholder="password"
				className="bg-white text-black"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button>Login</button>
			{error && <p>{error}</p>}
		</form>
	);
}
