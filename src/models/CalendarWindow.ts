type BaseWindowType = {
	id: number;
	day?: number;
	thumbnailPath: string;
	text: string;
	opened: number;
	locked?: boolean;
};

type WindowOf<Type extends string, Content> = BaseWindowType & {
	type?: Type;
	content?: Content;
};

export type TextWindowType = WindowOf<"text", { header?: string; text: string }>;
export type ImageWindowType = WindowOf<"image", { header?: string; text?: string; imagePath: string }>;
export type PdfWindowType = WindowOf<"pdf", { header?: string; text?: string; pdfPath: string }>;
export type AudioWindowType = WindowOf<"audio", { text: string; audioPath: string }>;
export type VideoWindowType = WindowOf<"video", { videoPath: string }>;

export type CalendarWindowType = TextWindowType | ImageWindowType | PdfWindowType | AudioWindowType | VideoWindowType;

export type WindowType = CalendarWindowType["type"];
export const WINDOW_TYPES = ["text", "image", "pdf", "audio", "video"] as const satisfies WindowType[];
