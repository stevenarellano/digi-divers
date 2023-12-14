import express from 'express';
import { ExampleBinRow } from '../types';
import { closeDB, fetchExampleByID, setDB } from '../db';

const urlPath = '/fetchExample';

const router = express.Router();

router.get(urlPath, async (req, res) => {});

interface FetchExampleRequest {
	task_id: number;
}

type FetchExampleResponse = ExampleBinRow;

router.post(urlPath, async (req, res) => {
	const { task_id }: FetchExampleRequest = req.body;

	try {
		setDB();
		const example: ExampleBinRow = await fetchExampleByID(task_id);
		res.send(example);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

export default router;
