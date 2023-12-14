import JSZip from 'jszip';
import { UnlabeledImageData } from '../../types';

async function zipToUnlabeledImageArray(
	fileBuffer: Buffer,
): Promise<UnlabeledImageData[]> {
	console.log(fileBuffer);
	const zip = await JSZip.loadAsync(fileBuffer);
	const imagePromises: Promise<UnlabeledImageData>[] = [];

	// Iterate through each file in the zip
	zip.forEach((_, zipEntry) => {
		// Only process PNG files
		if (zipEntry.name.endsWith('.png')) {
			// Create a promise that resolves with the image data
			const file_name = zipEntry.name.split('/').pop() || '';
			const imagePromise = zipEntry
				.async('blob')
				.then(async (img_blob: Blob) => ({
					file_name,
					img_blob: Buffer.from(await img_blob.arrayBuffer()),
				}));

			// Add the promise to the array
			imagePromises.push(imagePromise);
		}
	});

	// Wait for all the promises to resolve and return the resulting array of image data
	return Promise.all(imagePromises);
}

export default zipToUnlabeledImageArray;
