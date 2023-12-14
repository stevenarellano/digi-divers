import express from 'express';
import { UploadLabeledDataRequest, UploadLabeledDataResponse } from '../types';
import { addLabeledDataRow, setDB } from '../db';
import { truncateObject } from '../utils';
import {
	addXP,
	base64ToBase58,
	fetchDigisByWallet,
	transferSolToUser,
} from '../sol';
import { Nft, NftWithToken } from '@metaplex-foundation/js';
import {
	EARNED_PER_LABEL,
	LEVEL_MULTIPLIER,
	REQUIRED_EXPERIENCE,
	WALLET,
	XP_PER_LABEL,
} from '../constants';

const urlPath = '/uploadLD';

const router = express.Router();

export enum UploadResult {
	earned = 0,
	levelUp = 1,
	wrong = 2,
}
const randomResponses: UploadLabeledDataResponse[] = [
	{
		result: UploadResult.earned,
		newAttributes: {
			Level: '1',
			Rating: '1',
			Experience: '1',
		},
	},
];

function getRandomValue(array: any[]) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

router.get(urlPath, (req, res) => {});
router.post(urlPath, async (req, res) => {
	console.log(
		'uploadLD.route.ts: req.body: ' +
			JSON.stringify({
				...req.body,
				labeledData: truncateObject(req.body.labeledData),
			}),
	);

	const {
		walletAddress,
		labeledData,
		nftAttributes,
	}: UploadLabeledDataRequest = req.body;
	let earnedSol: number = 0;
	try {
		setDB();
		await addLabeledDataRow(labeledData);

		earnedSol =
			Number(nftAttributes.Level) * LEVEL_MULTIPLIER * EARNED_PER_LABEL +
			EARNED_PER_LABEL;

		let response: UploadLabeledDataResponse = {
			result: UploadResult.earned,
			solEarned: earnedSol,
			newAttributes: {
				Level: nftAttributes.Level,
				Rating: nftAttributes.Rating,
				Experience: nftAttributes.Experience,
			},
		};

		if (Number(nftAttributes.Experience) == REQUIRED_EXPERIENCE - 1) {
			response.result = UploadResult.levelUp;
			response.newAttributes = {
				Level: (Number(nftAttributes.Level) + 1).toString(),
				Rating: nftAttributes.Rating,
				Experience: '0',
			};
		} else {
			response.newAttributes = {
				Level: nftAttributes.Level,
				Rating: nftAttributes.Rating,
				Experience: (Number(nftAttributes.Experience) + 1).toString(),
			};
		}
		res.send(response);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}

	try {
		const digiList: Nft[] = await fetchDigisByWallet(walletAddress);
		console.log('ADDING XP');
		await addXP(digiList[0] as NftWithToken, XP_PER_LABEL);
		console.log('NFT XP added && now transfering SOL');
		await transferSolToUser(
			WALLET,
			base64ToBase58(walletAddress),
			earnedSol,
		);
	} catch (error) {
		console.log('Error adding XP or transferring SOL: ' + error);
	}
});

export default router;
