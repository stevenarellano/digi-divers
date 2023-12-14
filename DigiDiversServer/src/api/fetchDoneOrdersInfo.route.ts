import express from 'express';
import { TasksRow } from '../types';
import { fetchDoneTasksByUserID } from '../db';
import { DEBUG_MODE } from '../constants';

const urlPath = '/fetchDone';

const router = express.Router();

interface FetchDoneRequest {
	walletAddress: string;
}

type FetchDoneResponse = TasksRow[];

router.post(urlPath, async (req, res) => {
	if (DEBUG_MODE) {
		console.log(
			'fetchDoneOrdersInfo.route.ts: req.body: ' +
				JSON.stringify(req.body),
		);
	}
	const { walletAddress }: FetchDoneRequest = req.body;

	try {
		const doneOrders: TasksRow[] =
			(await fetchDoneTasksByUserID(walletAddress)) || [];
		res.send(doneOrders);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

export default router;
