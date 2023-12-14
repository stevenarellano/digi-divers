import { UnlabeledImageData } from '../../types';
import * as fs from 'fs';

async function saveUnlabeledImage(
	imageData: UnlabeledImageData,
	fileName: string,
) {
	const { buffer } = await imageData.img_blob;
	const bufferView: DataView = new DataView(buffer);

	fs.writeFile(`./assets/saved/${fileName}`, bufferView, (err) => {
		if (err) {
			console.error(`Error writing file: ${err.message}`);
			throw err;
		}
	});
}

export default saveUnlabeledImage;
