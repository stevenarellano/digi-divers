import { connectToDB } from './upload';
import { ExampleBinRow } from '../types';
import { DB_CONNECTION } from '../constants';

const tableName = 'example_bin';

async function addExampleBinRow(exampleBinRow: ExampleBinRow) {
	const { image_blob, file_name, task_id, label, date_uploaded } =
		exampleBinRow;
	const query = `INSERT INTO example_bin (image_blob, file_name, task_id, label, date_uploaded) VALUES (?, ?, ?, ?, ?)`;
	const values = [image_blob, file_name, task_id, label, date_uploaded];
	const q = DB_CONNECTION.query(query, values);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function getExampleBins() {
	const query = `SELECT * FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function fetchExampleByID(task_id: number): Promise<ExampleBinRow> {
	let example: Promise<ExampleBinRow>;
	const query = `SELECT * FROM ${tableName} WHERE task_id = ${task_id} LIMIT 1`;
	const q = DB_CONNECTION.query(query);

	example = new Promise<ExampleBinRow>((resolve, reject) => {
		q.on('result', (row: any) => {
			console.log(`Example: ${JSON.stringify(row)}`);
			resolve(row);
		});

		q.on('error', (err: any) => {
			console.error(`Error fetching example: ${err.message}`);
			reject(err);
		});
	});

	return example;
}

async function clearExampleBin() {
	const query = `DELETE FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function test() {
	connectToDB(DB_CONNECTION);

	const exampleBinRow = {
		image_blob: Buffer.from(new ArrayBuffer(4)),
		file_name: 'dog_or_cat_1',
		task_id: 10,
		label: 'Dog',
		date_uploaded: new Date('2023-02-23'),
	};
	addExampleBinRow(exampleBinRow);
	// getExampleBins();

	DB_CONNECTION.end();
}
// test();

export { getExampleBins, fetchExampleByID, addExampleBinRow, clearExampleBin };
