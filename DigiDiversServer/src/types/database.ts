export interface QueueRow {
	unique_id?: string;
	date_uploaded: Date;
	file_name: string;
	task_id: number;
	label: string;
	image_blob: Buffer;
}

export interface TasksRow {
	task_id?: number;
	task_name: string;
	size: number;
	items_remaining: number;
	user_id: string;
	instructions: string;
}

export interface ExampleBinRow {
	unique_id?: string;
	date_uploaded: Date;
	file_name: string;
	task_id: number;
	label: string;
	image_blob: Buffer;
}

export interface LabeledDataRow {
	unique_id?: string;
	date_uploaded: Date;
	file_name: string;
	task_id: number;
	label: string;
	image_blob: Buffer;
}
