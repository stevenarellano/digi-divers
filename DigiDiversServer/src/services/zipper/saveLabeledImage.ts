import { LabeledImageData } from '../../types';
import * as fs from 'fs';

function writeImageDataToCsv(imageData: LabeledImageData): void {
	const { file_name, label } = imageData;
	const header = 'file_name,label\n';
	const row = `${file_name},${label}\n`;

	fs.writeFile('./assets/saved/data.csv', header, (err) => {
		if (err) {
			console.error(`Error writing file: ${err.message}`);
			throw err;
		}
		console.log(`Data has been written to CSV file.`);
	});

	fs.writeFile('./assets/saved/data.csv', row, { flag: 'a' }, (err) => {
		if (err) {
			console.error(`Error writing file: ${err.message}`);
			throw err;
		}
		console.log(`Data has been written to CSV file.`);
	});
}

async function saveLabeledImage(imageData: LabeledImageData, fileName: string) {
	const buffer = imageData.img_blob.buffer;
	const bufferView: DataView = new DataView(buffer);

	fs.writeFile(`./assets/saved/${fileName}`, bufferView, (err) => {
		if (err) {
			console.error(`Error writing file: ${err.message}`);
			throw err;
		}
	});

	writeImageDataToCsv(imageData);
}

export default saveLabeledImage;
