import { Document, Page } from "react-pdf";
import { useState } from "react";

import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import Snowflakes from "../decoration/Snowflakes";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfWindow() {
	const [numPages, setNumPages] = useState<number>();

	return (
		<div className="flex items-center justify-center min-h-screen px-4 bg-gray-900">
			<Snowflakes number={25} />
			<div className="bg-red-900/80 shadow-2xl rounded-3xl p-6 max-w-3xl w-full border-2 border-green-400 text-center">
				<h1 className="text-3xl text-yellow-400 font-bold mb-4">
					PDF Inhalt
				</h1>

				<div className="flex justify-center">
					<Document
						file={"/book.pdf"}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
						className="bg-white rounded-xl p-4 shadow-xl"
					>
						<Page
							pageNumber={1}
							width={600}
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
