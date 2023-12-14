import express from 'express';
import multer from 'multer';
import { uploadUDPostController } from './controllers';
import { DEBUG_MODE } from '../constants';

const upload = multer();
const urlPath = '/uploadUD';

const router = express.Router();

router.get(urlPath, (req, res) => {
	// function to handle request
	res.send('You just accessed the uploadUD route!');
});

router.post(
	urlPath,
	upload.fields([
		{ name: 'imageFilesZip', maxCount: 1 },
		{ name: 'imageData', maxCount: 1 },
		{ name: 'labelledMapping', maxCount: 1 },
	]),
	async (req, res) => {
		if (DEBUG_MODE) {
			console.log(
				'uploadUD.route.ts: req.body: ' + JSON.stringify(req.body),
			);
		}

		uploadUDPostController(req, res);
	},
);

export default router;
