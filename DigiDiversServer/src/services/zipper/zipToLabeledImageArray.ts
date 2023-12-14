import JSZip from 'jszip';
import csv from 'csvtojson';
import { LabeledImageData } from '../../types';

/**
 * This function takes in a labeled image zip buffer and a labeled image mapping buffer, and returns an array of labeled image data.
 * @param labeledImageZipBuffer - The labeled image zip buffer.
 * @param labeledImageMappingBuffer - The labeled image mapping buffer.
 * @returns An array of LabeledImageData.
 */
async function zipToLabeledImageArray(
	labeledImageZipBuffer: Buffer,
	labeledImageMappingBuffer: Buffer,
): Promise<LabeledImageData[]> {
	// Load the labeled image zip and mapping files
	const labeledImageZip = await JSZip.loadAsync(labeledImageZipBuffer);
	const labeledImageMappingCsv = await csv().fromString(
		labeledImageMappingBuffer.toString(),
	);

	// Create a map of file names to labels based on the labeled image mapping file
	const fileToLabelMap = new Map<string, string>();
	labeledImageMappingCsv.forEach((mapping: any) => {
		fileToLabelMap.set(mapping.file_name, mapping.label);
	});

	// Iterate through each file in the labeled image zip
	const labeledImagePromises: Promise<LabeledImageData>[] = [];
	labeledImageZip.forEach((_, zipEntry) => {
		// Only process PNG files
		if (zipEntry.name.endsWith('.png')) {
			// Get the file name and label for this image
			const file_name = zipEntry.name.split('/').pop() || '';
			const label = fileToLabelMap.get(file_name) ?? 'unknown';

			// Create a promise that resolves with the labeled image data
			const labeledImagePromise = zipEntry
				.async('blob')
				.then(async (blob: Blob) => ({
					file_name,
					label,
					img_blob: Buffer.from(await blob.arrayBuffer()),
				}));

			// Add the promise to the array
			labeledImagePromises.push(labeledImagePromise);
		}
	});

	// Wait for all the promises to resolve and return the resulting array of labeled image data
	return Promise.all(labeledImagePromises);
}

export default zipToLabeledImageArray;
