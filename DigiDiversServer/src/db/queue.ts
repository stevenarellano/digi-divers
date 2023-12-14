import { connectToDB } from './upload';
import { QueueRow } from '../types/database';
import { DB_CONNECTION } from '../constants';
import { truncateObject } from '../utils';

const tableName = 'queue';

async function addQueueRow(queueRow: QueueRow) {
	const { date_uploaded, file_name, task_id, label, image_blob } = queueRow;
	const query =
		'INSERT INTO queue (date_uploaded, file_name, task_id, label, image_blob) VALUES (?, ?, ?, ?, ?)';
	const values = [date_uploaded, file_name, task_id, label, image_blob];
	const q = DB_CONNECTION.query(query, values);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function getQueue() {
	const query = `SELECT * FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function popFromQueue(): Promise<QueueRow> {
	try {
		let num_data = 0;
		const query = `SELECT COUNT(*) AS count FROM ${tableName}`;
		const q = DB_CONNECTION.query(query);
		num_data = await new Promise<number>((resolve, reject) => {
			q.on('result', (row: any) => {
				console.log(row);
				resolve(row.count);
			});

			q.on('error', (err: any) => {
				console.error(`Error popping row: ${err.message}`);
				resolve(0);
				reject(err);
			});
		});

		if (num_data === 0) {
			const badResponse: QueueRow = {
				unique_id: '',
				date_uploaded: new Date(),
				file_name: '',
				task_id: -1,
				label: '',
				image_blob: Buffer.from([]),
			};

			return badResponse;
		}

		const query1 = `SELECT * FROM ${tableName} LIMIT 1`;
		const q1 = DB_CONNECTION.query(query1);
		const popped_task = await new Promise<QueueRow>((resolve, reject) => {
			q1.on('result', (row: any) => {
				console.log(
					`Popped row: ${JSON.stringify(truncateObject(row, 20))}`,
				);
				resolve(row);
			});

			q1.on('error', (err: any) => {
				console.error(`Error popping row: ${err.message}`);
				reject(err);
			});
		});

		const query2 = `DELETE FROM ${tableName} LIMIT 1`;
		const q2 = DB_CONNECTION.query(query2);
		q2.on('result', (row: any) => {
			console.log(row);
		});

		return popped_task;
	} catch (err) {
		console.error(`Error popping row: ${(err as any).message}`);
		throw err;
	}
}

async function clearQueue() {
	const query = `DELETE FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function test() {
	connectToDB(DB_CONNECTION);

	const queueRow = {
		image_blob: Buffer.from(new ArrayBuffer(4)),
		date_uploaded: new Date('2023-02-23'),
		file_name: 'dog_or_cat_1',
		task_id: 10,
		label: 'Dog',
	};
	addQueueRow(queueRow);
	// getQueue();

	DB_CONNECTION.end();
}
// test();

export { getQueue, addQueueRow, popFromQueue, clearQueue };
