export interface UnlabeledImageData {
	file_name: string;
	img_blob: Buffer;
}

export interface LabeledImageData {
	file_name: string;
	img_blob: Buffer;
	label: string;
}
