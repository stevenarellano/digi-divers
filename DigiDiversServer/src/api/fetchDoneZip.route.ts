import express from 'express';
import { fetchCompletedOrderData } from '../db';
import { labeledImagesToZip } from '../services';

const urlPath = '/fetchDoneZip';

const router = express.Router();

interface FetchDoneZipRequest {
	task_id: number;
}

type FetchDoneZipResponse = Blob;

router.post(urlPath, async (req, res) => {
	console.log('fetchDoneZip.route.ts: req.body: ' + JSON.stringify(req.body));

	const { task_id }: FetchDoneZipRequest = req.body;

	try {
		const [yesLabeledImagesList, noLabeledImagesList] =
			await fetchCompletedOrderData(task_id);

		console.log(`yesLabeledImagesList ${yesLabeledImagesList}`);
		const doneZip: Blob = await labeledImagesToZip(
			yesLabeledImagesList,
			noLabeledImagesList,
		);

		console.log(doneZip);
		const uint8Array = new Uint8Array(await doneZip.arrayBuffer());
		const buffer = Buffer.from(uint8Array);
		console.log(buffer);
		res.send({ blobBuffer: buffer });
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

export default router;
