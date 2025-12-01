import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export default function PdfWindow() {
	const [numPages, setNumPages] = useState<number>();

	return (
		<div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
			<div className="bg-red-900/80 shadow-2xl rounded-3xl p-6 max-w-3xl w-full border-2 border-green-400 text-center">
				<h1 className="text-3xl text-yellow-400 font-bold mb-4">PDF Inhalt</h1>

				<div className="flex justify-center">
					<Document
						file={"../../assets/1.pdf"}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						className="bg-white rounded-xl p-4 shadow-xl"
					>
						<Page pageNumber={1} width={600} />
					</Document>
				</div>

				<p className="text-white mt-2">(Seite 1 von {numPages})</p>
			</div>
		</div>
	);
}
