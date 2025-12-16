import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";

import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import Snowflakes from "../decoration/Snowflakes";
import type { PdfWindowType } from "../../models/CalendarWindow";
import { BACKEND_URL } from "../../constants";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfWindow({ data }: { data: PdfWindowType }) {
	const [numPages, setNumPages] = useState<number>();
	const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

	useEffect(() => {
		const fetchPdf = async () => {
			const res = await fetch(`${BACKEND_URL}/images/${data.content?.pdfPath}`, {
				credentials: "include",
			});

			if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.statusText}`);
			const buffer = await res.arrayBuffer();
			setPdfData(buffer);
		};

		fetchPdf().catch(console.error);
	}, [data.content?.pdfPath]);

	return (
		<div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
			<Snowflakes number={25} />
			<div className="bg-red-900/80 shadow-2xl rounded-3xl p-6 max-w-full sm:max-w-3xl w-full border-2 border-green-400 text-center">
				<h1 className="text-3xl text-yellow-400 font-bold mb-4">{data.content?.header}</h1>
				<p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line">
					{data.content?.text}
				</p>
				<div className="flex justify-center">
					<Document
						file={pdfData}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						className="bg-white rounded-xl p-1 sm:p-4 shadow-xl w-full"
					>
						<Page
							pageNumber={1}
							width={Math.min(600, window.innerWidth - 32)}
							renderTextLayer={false}
							renderAnnotationLayer={false}
						/>
					</Document>
				</div>

				<p className="text-white mt-2">(Seite 1 von {numPages})</p>
			</div>
		</div>
	);
}
