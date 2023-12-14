import { atom } from 'recoil';

const phantomState = atom({
	key: 'phantomState',
	default: '',
});

const queryInfoState = atom({
	key: 'queryInfoState',
	default: {
		period: ['', ''],
		queries: {},
		count: 0,
	},
});

export interface AddOrderFormData {
	datasetName: string;
	modelType: string;
	requiredReviews?: number; // debating whether to include this
	imageFilesZip: File | null;
	dataCount: number | null;
	instructions: string;
	imageData: File | null;
	labelledMapping: File | null;
	walletAddress: string;
}

const addOrderFormState = atom<AddOrderFormData>({
	key: 'addOrderFormState',
	default: {
		datasetName: '',
		modelType: '',
		// requiredReviews: 0,
		imageFilesZip: null,
		dataCount: null,
		instructions: '',
		imageData: null,
		labelledMapping: null,
		walletAddress: '',
	},
});

export { phantomState, queryInfoState, addOrderFormState };
