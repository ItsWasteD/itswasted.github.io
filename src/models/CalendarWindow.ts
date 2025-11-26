type BaseWindow = {
	id: number;
	day: number;
	opened: number;
	locked: boolean;
	thumbnailPath: string;
};

type WindowOf<Type extends string, Content> = BaseWindow & {
	type: Type;
	content: Content;
};

export type ImageWindow = WindowOf<
	"image",
	{ text: string; imagePath: string }
>;
export type PdfWindow = WindowOf<"pdf", { pdfPath: string }>;
export type VideoWindow = WindowOf<"video", { videoPath: string }>;
export type GifWindow = WindowOf<"gif", { gifPath: string }>;

export type CalendarWindow = ImageWindow | PdfWindow | VideoWindow | GifWindow;
