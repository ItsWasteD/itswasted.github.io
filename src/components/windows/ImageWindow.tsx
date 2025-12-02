import { BACKEND_URL } from "../../constants";
import type { ImageWindowType } from "../../models/CalendarWindow";
import Snowflakes from "../decoration/Snowflakes";
import StringLights from "../decoration/StringLights";

export default function ImageWindow({ data }: { data: ImageWindowType }) {
	return (
		<div className="relative flex items-center justify-center min-h-screen px-4 bg-gray-900 overflow-hidden">
			<Snowflakes number={25} />
			<div className="relative z-10 bg-red-900/80 shadow-2xl rounded-3xl p-8 max-w-lg w-full text-center border-2 border-green-400">
				<h1 className="text-3xl md:text-4xl text-yellow-400 font-extrabold mb-4">{data.content?.header}</h1>
				<p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line">
					{data.content?.text}
				</p>
				<img className="mx-auto p-4" src={`${BACKEND_URL + "/images/" + data.content?.imagePath}`} />
				<StringLights number={16} />
			</div>
		</div>
	);
}
