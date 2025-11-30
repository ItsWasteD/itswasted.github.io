export default function Snowflakes({ number }: { number: number }) {
	const snowflakes = Array.from({ length: number });

	return snowflakes.map((_, i) => {
		const left = Math.random() * 100;
		const duration = 5 + Math.random() * 5;
		const delay = Math.random() * 5;
		const size = 16 + Math.random() * 16;
		const initialTop = Math.random() * -100 - 32;
		const rotation = Math.random() > 0.5 ? "-360deg" : "360deg";

		return (
			<span
				key={i}
				className="snowflake"
				style={{
					left: `${left}%`,
					top: `${initialTop}px`,
					animationDuration: `${duration}s`,
					animationDelay: `${delay}s`,
					fontSize: `${size}px`,
					["--rotate" as never]: rotation,
				}}
			>
				❄️
			</span>
		);
	});
}
