import axios from 'axios';
import { BASE_URL } from '../../context';

const callPay = async (requestBody: {
	period: string[];
	queries: any;
	count: number;
}) => {
	let accessKey = '';

	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		const res = await axios.post(`${BASE_URL}/api/pay`, requestBody, {
			headers,
		});

		accessKey = res.data.access_key;
	} catch (error) {
		console.log('Trouble Paying on the server');
	}

	return accessKey;
};

export default callPay;
