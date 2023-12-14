import { NftAttributes } from '../sol';

export type UploadUnlabledDataResponse = string;

export interface UploadLabeledDataResponse {
	result: UploadResult;
	solEarned?: number;
	newAttributes?: NftAttributes;
}

export enum UploadResult {
	earned = 0,
	levelUp = 1,
	wrong = 2,
}
