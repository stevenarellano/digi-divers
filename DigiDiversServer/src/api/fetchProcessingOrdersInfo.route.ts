import express from 'express';
import { TasksRow } from '../types';
import { DEBUG_MODE } from '../constants';
import { fetchProcessingOrdersInfo } from '../db';

const urlPath = '/fetchProcessing';

const router = express.Router();

interface FetchProcessingRequest {
	walletAddress: string;
}

type FetchProcessingResponse = TasksRow[];

router.post(urlPath, async (req, res) => {
	if (DEBUG_MODE) {
		console.log(
			'fetchProcessingOrdersInfo.route.ts: req.body: ' +
				JSON.stringify(req.body),
		);
	}
	const { walletAddress }: FetchProcessingRequest = req.body;

	try {
		const doneOrders: TasksRow[] =
			(await fetchProcessingOrdersInfo(walletAddress)) || [];
		res.send(doneOrders);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

export default router;
