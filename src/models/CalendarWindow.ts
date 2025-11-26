type BaseWindowType = {
	id: number;
	day: number;
	thumbnailPath: string;
	text: string;
	opened: number;
	locked: boolean;
};

type WindowOf<Type extends string, Content> = BaseWindowType & {
	type: Type;
	content: Content;
};

export type TextWindowType = WindowOf<"text", { text: string }>;
export type ImageWindowType = WindowOf<"image", { text: string; imagePath: string }>;
export type PdfWindowType = WindowOf<"pdf", { pdfPath: string }>;
export type VideoWindowType = WindowOf<"video", { videoPath: string }>;
export type GifWindowType = WindowOf<"gif", { gifPath: string }>;

export type CalendarWindowType = TextWindowType | ImageWindowType | PdfWindowType | VideoWindowType | GifWindowType;
