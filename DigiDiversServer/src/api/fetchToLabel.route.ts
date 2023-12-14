import express from 'express';
import { QueueRow } from '../types';
import { decrementRemaining, popFromQueue, setDB } from '../db';
import { DEBUG_MODE } from '../constants';

const urlPath = '/fetchToLabel';

const router = express.Router();

router.get(urlPath, async (req, res) => {
	if (DEBUG_MODE) {
		console.log(
			'fetchToLabel.route.ts: req.body: ' + JSON.stringify(req.body),
		);
	}

	try {
		setDB();
		const popped_data: QueueRow = await popFromQueue();

		const { task_id } = popped_data;

		if (task_id !== -1) {
			await decrementRemaining(task_id);
		}
		res.send(popped_data);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

router.post(urlPath, async (req, res) => {
	// function to handle request
});

export default router;
