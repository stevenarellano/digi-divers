import { connectToDB } from './upload';
import { LabeledDataRow, LabeledImageData } from '../types';
import { DB_CONNECTION } from '../constants';
import { setDB } from './misc';

const tableName = 'labeled_data';

async function addLabeledDataRow(labeledDataRow: LabeledDataRow) {
	try {
		const { image_blob, file_name, task_id, label, date_uploaded } =
			labeledDataRow;
		const query = `INSERT INTO labeled_data (date_uploaded, file_name, task_id, label, image_blob) VALUES (?, ?, ?, ?, ?)`;
		const values = [
			date_uploaded,
			file_name,
			task_id,
			label,
			Buffer.from(image_blob),
		];
		DB_CONNECTION.query(query, values, (error, results) => {
			if (error) {
				console.error('Error adding labeled data:', error);
			} else {
				console.log('Results:', results);
			}
		});
	} catch (error) {
		console.error('Error adding labeled data:', error);
	}
}

async function getLabeledData() {
	const query = `SELECT * FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function fetchCompletedOrderData(
	task_id: number,
): Promise<[LabeledDataRow[], LabeledDataRow[]]> {
	setDB();

	let yesLabeledImagesList: LabeledDataRow[] = [];
	let noLabeledImagesList: LabeledDataRow[] = [];

	const query = `SELECT * FROM ${tableName} WHERE task_id = ${task_id}`;
	const q = DB_CONNECTION.query(query);

	return new Promise<[LabeledDataRow[], LabeledDataRow[]]>(
		(resolve, reject) => {
			const q = DB_CONNECTION.query(query);
			q.on('result', (row: any) => {
				if (row.label == 'Yes') {
					yesLabeledImagesList.push(row);
				} else if (row.label == 'No') {
					noLabeledImagesList.push(row);
				}
			});
			q.on('end', () => {
				resolve([yesLabeledImagesList, noLabeledImagesList]);
			});
			q.on('error', (err: Error) => {
				reject(err);
			});
		},
	);
	// const res = [yesLabeledImagesList, noLabeledImagesList];
	// console.log(`yesLabeledImagesList: ${yesLabeledImagesList}`);
	// console.log(`noLabeledImagesList: ${noLabeledImagesList}`);
	// return res;
}

async function clearLabeledData() {
	const query = `DELETE FROM ${tableName}`;
	const q = DB_CONNECTION.query(query);
	q.on('result', (row: any) => {
		console.log(row);
	});
}

async function test() {
	connectToDB(DB_CONNECTION);

	const labeledDataRow = {
		date_uploaded: new Date('2023-02-23'),
		file_name: 'dog_or_cat_1',
		task_id: 10,
		label: 'Dog',
		image_blob: Buffer.from(new ArrayBuffer(4)),
	};
	addLabeledDataRow(labeledDataRow);
	// getLabeledData();

	DB_CONNECTION.end();
}
// test();

export {
	getLabeledData,
	fetchCompletedOrderData,
	addLabeledDataRow,
	clearLabeledData,
};
