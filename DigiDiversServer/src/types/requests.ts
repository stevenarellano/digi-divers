import { NftAttributes } from '../sol';
import { LabeledDataRow } from './database';

export interface UploadUnlabledDataRequest {
	datasetName: string;
	modelType: string;
	dataCount: number;
	instructions: string;
	walletAddress: string;
}

export interface MulterFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
}

export interface UploadUnlabeledDataRequestFiles {
	imageFilesZip: MulterFile[];
	imageData: MulterFile[];
	labelledMapping: MulterFile[];
}

export interface UploadLabeledDataRequest {
	walletAddress: string;
	labeledData: LabeledDataRow;
	nftAttributes: NftAttributes;
}
