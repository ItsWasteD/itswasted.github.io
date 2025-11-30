import type { TextWindowType } from "../../models/CalendarWindow";

export default function TextWindow({ data }: { data: TextWindowType }) {
	const snowflakes = Array.from({ length: 15 });

	return (
		<div className="relative flex items-center justify-center min-h-screen px-4 bg-gray-900 overflow-hidden">
			{snowflakes.map((_, i) => {
				const left = Math.random() * 100;
				const duration = 5 + Math.random() * 5;
				const delay = Math.random() * 5;
				const size = 16 + Math.random() * 16;
				const initialTop = Math.random() * -100 - 32;

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
						}}
					>
						❄️
					</span>
				);
			})}
			<div className="bg-red-900/80 shadow-2xl rounded-3xl p-8 max-w-lg w-full text-center border-2 border-green-400 relative z-10">
				<h1 className="text-3xl md:text-4xl text-yellow-400 font-extrabold mb-4">{data.content!.header}</h1>
				<p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line">
					{data.content!.text}
				</p>
			</div>
		</div>
	);
}
