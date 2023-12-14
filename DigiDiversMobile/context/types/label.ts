import { NftAttributes } from "./walletInfo";

export interface LabeledData {
  unique_id?: string;
  date_uploaded: Date;
  file_name: string;
  task_id: number;
  label: string;
  image_blob: Buffer;
}

export interface UploadLabeledResponse {
  result: UploadResult;
  solEarned?: number;
  newAttributes?: NftAttributes;
}

export enum UploadResult {
  earned = 0,
  levelUp = 1,
  wrong = 2,
}
