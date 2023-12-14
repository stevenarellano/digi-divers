import express from 'express';
import { fetchMaxDigiByWallet } from '../sol';

const urlPath = '/fetchDigi';

const router = express.Router();

interface FetchDigiRequest {
	walletAddress: string;
}

interface DigiInfo {
	name: string;
	attributes: NftAttributes;
	imageUrl: string;
	symbol: string;
}

interface NftAttributes {
	Level: string;
	Rating: string;
	Experience: string;
}

interface FetchDigiResponse {
	totalDigis: number;
	maxDigi: DigiInfo;
}

// EZCZz/y0YImqB6dGtua8GB7lSmZKGr9Go9k7Nsz0CP4=

router.post(urlPath, async (req, res) => {
	console.log('fetchDigi.route.ts: req.body: ' + JSON.stringify(req.body));
	const { walletAddress }: FetchDigiRequest = req.body;

	try {
		const digiResponse: FetchDigiResponse = await fetchMaxDigiByWallet(
			walletAddress,
		);
		console.log(digiResponse);
		res.send(digiResponse);
	} catch (error) {
		console.log(error);
		res.status(500);
		res.send('The following error occured: ' + error);
	}
});

export default router;
