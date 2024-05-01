export type FileMetadata = {
	mimetype: string;
	filename: string;
};

export type ImageContentMetadata = {
	width: number;
	height: number;
	size: number;
	format: string;
};

export type ImageMetadata = FileMetadata & ImageContentMetadata;
