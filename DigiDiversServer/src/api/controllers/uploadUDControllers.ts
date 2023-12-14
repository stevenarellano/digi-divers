import {
	addExampleBinRow,
	addQueueRow,
	addTasksRow,
	clearTasks,
	closeDB,
	fetchExampleByID,
	getQueue,
	getTasks,
	resetDBTables,
	setDB,
} from '../../db';
import {
	zipToLabeledImageArray,
	zipToUnlabeledImageArray,
} from '../../services';
import {
	ExampleBinRow,
	LabeledImageData,
	QueueRow,
	TasksRow,
	UnlabeledImageData,
	UploadUnlabeledDataRequestFiles,
	UploadUnlabledDataRequest,
	UploadUnlabledDataResponse,
} from '../../types';

async function uploadUDPostController(req: any, res: any) {
	try {
		const {
			datasetName,
			modelType,
			dataCount,
			instructions,
			walletAddress,
		}: UploadUnlabledDataRequest = req.body;
		const {
			imageFilesZip,
			imageData,
			labelledMapping,
		}: UploadUnlabeledDataRequestFiles = req.files as any;

		setDB();

		const tasksRow: TasksRow = {
			task_name: datasetName,
			size: dataCount,
			items_remaining: Math.floor(dataCount),
			user_id: walletAddress,
			instructions: instructions,
		};

		const task_id = await addTasksRow(tasksRow);

		const labeledImages: LabeledImageData[] = await zipToLabeledImageArray(
			imageData[0].buffer,
			labelledMapping[0].buffer,
		);

		const firstYesIndex = labeledImages.findIndex(
			(obj) => obj.label === 'yes',
		);
		const firstYes = labeledImages.splice(firstYesIndex, 1)[0];

		const exampleBinRow: ExampleBinRow = {
			task_id,
			label: firstYes.label,
			date_uploaded: new Date(),
			file_name: firstYes.file_name,
			image_blob: firstYes.img_blob,
		};
		await addExampleBinRow(exampleBinRow);

		// UNZIP IMAGEDATA
		const unlabeledImages: UnlabeledImageData[] =
			await zipToUnlabeledImageArray(imageFilesZip[0].buffer);

		const toDBRows: QueueRow[] = [...labeledImages, ...unlabeledImages].map(
			(obj) => {
				return {
					task_id,
					label: (obj as any).label || 'unlabeled',
					date_uploaded: new Date(),
					file_name: obj.file_name,
					image_blob: obj.img_blob,
				};
			},
		);
		toDBRows.forEach(async (obj: QueueRow) => {
			await addQueueRow(obj);
		});

		const response: UploadUnlabledDataResponse = '0';
		res.send(response);
	} catch (error) {
		res.status(500);
		res.send('The following error occured: ' + error);
	}
}

export { uploadUDPostController };
