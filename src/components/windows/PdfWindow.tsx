import { Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";

import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import Snowflakes from "../decoration/Snowflakes";
import type { PdfWindowType } from "../../models/CalendarWindow";
import { BACKEND_URL } from "../../constants";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfWindow({ data }: { data: PdfWindowType }) {
	const [numPages, setNumPages] = useState<number>();
	const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
	const [pdfWidth, setPdfWidth] = useState<number>(0);

	const pdfContainerRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (!pdfContainerRef.current) return;

		const observer = new ResizeObserver(([entry]) => {
			const nextWidth = Math.floor(entry.contentRect.width);

			setPdfWidth((prev) => (prev !== nextWidth ? nextWidth : prev));
		});

		observer.observe(pdfContainerRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
			<Snowflakes number={25} />
			<div
				ref={pdfContainerRef}
				className="bg-red-900/80 shadow-2xl rounded-3xl border-2 border-green-400 w-full max-w-full sm:max-w-3xl h-[90vh] flex flex-col p-4 sm:p-6 text-center"
			>
				<h1 className="text-3xl text-yellow-400 font-bold mb-4 text-center shrink-0">{data.content?.header}</h1>
				<p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-line text-center mb-4 shrink-0">
					{data.content?.text}
				</p>
				<div className="flex-1 flex justify-center overflow-auto">
					<Document
						file={pdfData}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						className="bg-white rounded-xl shadow-xl"
					>
						<Page pageNumber={1} width={pdfWidth} renderTextLayer={false} renderAnnotationLayer={false} />
					</Document>
				</div>

				<p className="text-white mt-2 text-center shrink-0">(Seite 1 von {numPages})</p>
			</div>
		</div>
	);
}
