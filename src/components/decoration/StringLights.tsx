export default function StringLights({ number }: { number: number }) {
	const lights = Array.from({ length: number });

	return lights.map((_, i) => {
		const side = i % 2 === 0 ? "top" : "bottom";
		const left = (i / lights.length) * 100 + 3;
		const colorOptions = ["#FFD700", "#FF0000", "#00FF00", "#00FFFF"];
		const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
		const delay = Math.random() * 2;
		const duration = 1 + Math.random() * 1.5;

		return (
			<span
				key={i}
				className="string-light"
				style={{
					[side]: "-8px",
					left: `${left}%`,
					backgroundColor: color,
					animationDelay: `${delay}s`,
					animationDuration: `${duration}`,
				}}
			></span>
		);
	});
}
