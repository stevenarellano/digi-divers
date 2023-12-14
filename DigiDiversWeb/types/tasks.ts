interface TaskInfo {
	task_id?: number;
	task_name: string;
	size: number;
	items_remaining: number;
	user_id: string;
	instructions: string;
}

export type { TaskInfo };
