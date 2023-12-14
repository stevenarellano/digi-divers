import axios from 'axios';
import { BASE_URL } from '../../context';
import { TaskInfo } from '../../types';

interface fetchDoneOrdersRequest {
	walletAddress: string;
}

interface fetchProcessingOrdersRequest {
	walletAddress: string;
}

interface fetchDoneOrderRequest {
	task_id: number;
}

const useGetOrder = () => {
	const fetchDoneOrders = async (
		walletAddress: string,
	): Promise<TaskInfo[]> => {
		try {
			const request: fetchDoneOrdersRequest = {
				walletAddress,
			};
			const res = await axios.post(`${BASE_URL}/api/fetchDone`, request);

			return res.data;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch done orders');
		}
	};

	const fetchDoneOrder = async (task_id: number): Promise<Blob> => {
		try {
			const request: fetchDoneOrderRequest = {
				task_id,
			};
			const res = await axios.post(
				`${BASE_URL}/api/fetchDoneZip`,
				request,
				{
					maxContentLength: 1000000000000,
					maxBodyLength: 1000000000000,
				},
			);

			console.log(`res.data: ${JSON.stringify(res.data.blobBuffer)}`);

			const buffer = Buffer.from(res.data.blobBuffer);
			console.log(`buffer: ${JSON.stringify(buffer)}`);
			const blob = new Blob([buffer], { type: 'application/zip' });
			console.log(blob);

			return blob;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch done orders');
		}
	};

	const fetchProcessingOrders = async (
		walletAddress: string,
	): Promise<TaskInfo[]> => {
		try {
			const request: fetchProcessingOrdersRequest = {
				walletAddress,
			};
			const res = await axios.post(
				`${BASE_URL}/api/fetchProcessing`,
				request,
			);

			return res.data;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch done orders');
		}
	};

	return { fetchDoneOrders, fetchDoneOrder, fetchProcessingOrders };
};

export default useGetOrder;
