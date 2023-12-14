import JSZip from 'jszip';
import { LabeledDataRow } from '../../types';
import fs from 'fs';
import saveLabeledImage from './saveLabeledImage';

/**
 * This function takes in two labeled image arrays (images labeled yes and no), and returns a zipfile.
 * @param yesLabeledImagesList - An array of LabeledImageData with images labeled yes.
 * @param noLabeledImagesList - An array of LabeledImageData with images labeled no.
 * @returns A zipfile.
 */
async function labeledImagesToZip(
	yesLabeledImagesList: LabeledDataRow[],
	noLabeledImagesList: LabeledDataRow[],
): Promise<Blob> {
	// Load the labeled image zip and mapping files
	try {
		var zip = new JSZip();

		// Add a text file with the contents "Hello World\n"
		var yesFolder = zip.folder('yes')!;

		console.log(`yesLabeledImagesList: ${yesLabeledImagesList}`);

		for (const img of yesLabeledImagesList) {
			yesFolder.file(img.file_name, img.image_blob);
		}

		var noFolder = zip.folder('no')!;

		for (const img of noLabeledImagesList) {
			noFolder.file(img.file_name, img.image_blob);
		}

		const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

		fs.writeFileSync(
			'/Users/stevenarellano/Desktop/stuff/nauticus/DigiDiversServer/src/services/zipper/myzipfile.zip',
			zipContent,
		);

		const blob = new Blob([zipContent], { type: 'application/zip' });

		return blob;
	} catch (error) {
		console.log(error);
	}
	return new Blob();
}

export default labeledImagesToZip;
