import { connectToDB } from './upload';
import { TasksRow } from '../types';
import { DB_CONNECTION } from '../constants';
import { setDB } from './misc';

const tableName = 'tasks';

async function addTasksRow(tasksRow: TasksRow): Promise<number> {
	const { task_name, size, items_remaining, user_id, instructions } =
		tasksRow;
	const query =
		'INSERT INTO tasks (task_name, size, items_remaining, user_id, instructions) VALUES (?, ?, ?, ?, ?)';
	const values = [task_name, size, items_remaining, user_id, instructions];
	const q = DB_CONNECTION.query(query, values);

	// Return a Promise that resolves with the inserted ID when the 'result' event is emitted
	return new Promise<number>((resolve, reject) => {
		q.on('result', (row: any) => {
			console.log(`Added row: ${JSON.stringify(row)}`);
			resolve(row.insertId);
		});

		// Reject the Promise if an error occurs
		q.on('error', (err: any) => {
			console.error(`Error adding row: ${err.message}`);
			reject(err);
		});
	});
}

async function getTasks() {
	const query = `SELECT * FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function fetchTaskByID(task_id: string) {
	setDB();

	const query = `SELECT * FROM ${tableName} WHERE task_id == ${task_id}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function fetchDoneTasksByUserID(user_id: string): Promise<TasksRow[]> {
	setDB();

	const query = 'SELECT * FROM ?? WHERE user_id = ? AND items_remaining = 0';
	const values = [tableName, user_id];

	const q = DB_CONNECTION.query(query, values);
	return new Promise<TasksRow[]>((resolve, reject) => {
		const rows: TasksRow[] = [];
		q.on('result', (row: TasksRow) => {
			console.log(`Fetched row: ${JSON.stringify(row)}`);
			rows.push(row);
		});

		q.on('end', () => {
			resolve(rows);
		});

		q.on('error', (err: any) => {
			console.log(err);
			reject(err);
		});
	});
}

async function fetchProcessingOrdersInfo(user_id: string): Promise<TasksRow[]> {
	setDB();

	const query = 'SELECT * FROM ?? WHERE user_id = ? AND items_remaining > 0';
	const values = [tableName, user_id];

	const q = DB_CONNECTION.query(query, values);
	return new Promise<TasksRow[]>((resolve, reject) => {
		const rows: TasksRow[] = [];
		q.on('result', (row: TasksRow) => {
			console.log(`Fetched row: ${JSON.stringify(row)}`);
			rows.push(row);
		});

		q.on('end', () => {
			resolve(rows);
		});

		q.on('error', (err: any) => {
			console.log(err);
			reject(err);
		});
	});
}

async function clearTasks() {
	const query = `DELETE FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function decrementRemaining(task_id: number) {
	const query1 = `UPDATE ${tableName} SET items_remaining = items_remaining - 1 WHERE task_id = ${task_id} AND items_remaining > 0`;
	const q1 = DB_CONNECTION.query(query1);
	q1.on('result', (row: any) => {
		console.log(row);
	});
}

async function test() {
	connectToDB(DB_CONNECTION);

	const tasksRow = {
		task_name: 'helo',
		size: 10,
		items_remaining: 10,
		user_id: 'user1',
		instructions: 'Complete task 1',
	};
	addTasksRow(tasksRow);
	// getTasks();

	DB_CONNECTION.end();
}
// test();

export {
	getTasks,
	addTasksRow,
	fetchTaskByID,
	fetchDoneTasksByUserID,
	clearTasks,
	decrementRemaining,
	fetchProcessingOrdersInfo,
};
