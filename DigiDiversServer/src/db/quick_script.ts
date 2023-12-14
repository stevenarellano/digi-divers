import { type } from 'os';
import { DB_CONNECTION } from '../constants';
import { QueueRow, TasksRow, UnlabeledImageData } from '../types';
import { addQueueRow, clearQueue, getQueue } from './queue';
import { addTasksRow } from './tasks';
import { connectToDB } from './upload';
import * as fs from 'fs';
import { saveUnlabeledImage } from '../services';
import { addExampleBinRow } from './example_bin';
import { getLabeledData } from './labeled_data';
import { resetDBTables, setDB } from './misc';

async function queryDB() {
	DB_CONNECTION.query(
		'SELECT * FROM users',
		function (err: any, results: any, fields: any) {
			if (err) {
				console.error('Error creating database: ' + err.stack);
				return;
			}

			console.log(results);
		},
	);
}

export async function uploadData(orderData: any) {
	const obj = JSON.parse(orderData);
	// datasetName: string;
	// modelType: string;
	// imageFilesZip: File;
	// dataCount: number;
	// instructions: string;
	// imageData: File;
	// labelledMapping: File;
	// unzip_images(obj.imageFilesZip, 'Fill out');
	// unzip_images(obj.imageData, 'Dest');

	DB_CONNECTION.query(`INSERT INTO queue (unique_id, image_blob, file_name, task_id, label, date_uploaded))\
					  VALUES (${obj}, ${obj});`);
}

async function fillQueue() {
	connectToDB(DB_CONNECTION);
	// clearQueue();
	const png = fs.readFileSync('../../assets/saved/img.png');
	const pngBlob = Buffer.from(await new Blob([png]).arrayBuffer());

	// console.log(
	// 	`pngBlob is of type: ${typeof pngBlob} and  looks like: ${JSON.stringify(
	// 		pngBlob.size,
	// 	)}`,
	// );
	console.log(pngBlob);

	const qRow: QueueRow = {
		file_name: '123',
		task_id: 1,
		label: '123',
		date_uploaded: new Date(),
		image_blob: pngBlob,
	};
	for (let i = 0; i < 5; i++) {
		await addQueueRow(qRow);
	}
	await addExampleBinRow(qRow);
	const q = DB_CONNECTION.query('SELECT * FROM queue');
	q.on('result', async (row: any) => {
		const buff = Buffer.from(row.image_blob);
		const daBlob = new Blob([buff]);
		const unlabeledImageData: UnlabeledImageData = {
			file_name: '123.png',
			img_blob: Buffer.from(await daBlob.arrayBuffer()),
		};
		saveUnlabeledImage(unlabeledImageData, '123.png');
	});

	DB_CONNECTION.end();
}

async function fetcher() {
	connectToDB(DB_CONNECTION);
	// getLabeledData();
	getQueue();
}

async function clearDB() {
	setDB();
	resetDBTables();
}

// fillQueue();
// fetcher();
clearDB();
