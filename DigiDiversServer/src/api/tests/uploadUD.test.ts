/*

	THIS FILE ISN'T DONE, DON'T TEST

*/

import { MulterFile, UploadUnlabledDataRequest } from '../../types';

const fs = require('fs');
const path = require('path');

// LABELED ZIP DATA
const ldFilePath = path.join(
	__dirname,
	'../../../assets/tests',
	'labeledZip.zip',
);
const labeledRawData = fs.readFileSync(ldFilePath, 'utf8');
const labeledImagesZip: File = new File([labeledRawData], 'labeledZip.zip', {
	type: 'application/zip',
	lastModified: Date.now(),
});

// UNLABELED ZIP DATA
const udFilePath = path.join(
	__dirname,
	'../../../assets/tests',
	'labeledZip.zip',
);
const unlabeledRawData = fs.readFileSync(udFilePath, 'utf8');
const unlabeledImagesZip: File = new File(
	[unlabeledRawData],
	'unlabeledZip.zip',
	{
		type: 'application/zip',
		lastModified: Date.now(),
	},
);

// CSV DATA
const csvFilePath = path.join(
	__dirname,
	'../../../assets/tests',
	'labeledZip.zip',
);
const csvRawData = fs.readFileSync(csvFilePath, 'utf8');
const csvFile: File = new File([csvRawData], 'labeled.csv', {
	type: 'text/csv',
	lastModified: Date.now(),
});
const csvMulter: MulterFile = {
	fieldname: 'labelledMapping',
	originalname: 'labeled.csv',
	encoding: '7bit',
	mimetype: 'text/csv',
	buffer: csvRawData,
	size: 1000,
};

const test1RequestBody: UploadUnlabledDataRequest = {
	datasetName: 'Test 1',
	modelType: 'Image Classification',
	dataCount: 29,
	instructions: 'Complete task 1',
	walletAddress: 'C8eSR6EXDSMH8ZE8TmtgC5XEUvM4pmTSad16Jq8KqmWi',
};

// const test1RequestFiles: UploadUnlabeledDataRequestFiles = {};

describe('sum module', () => {
	test('adds 1 + 2 to equal 3', () => {
		expect(3).toBe(3);
	});
});
