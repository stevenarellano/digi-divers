import axios from 'axios';
import { BASE_URL } from '../../context';

export const getQuote = async (requestBody: any) => {
	let quoteId = '';

	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		const res = await axios.post(`${BASE_URL}/api/quote`, requestBody, {
			headers,
		});
		console.log(res.data);
		quoteId = res.data.quote_id;
	} catch (error) {
		console.log('Trouble getting quote on the server');
	}

	return quoteId;
};

export const fetchQuote = async (quoteId: string) => {
	let quote = {};

	const headers = {
		'Content-Type': 'application/json',
	};

	try {
		const res = await axios.get(
			`${BASE_URL}/api/quote?quote_id=${quoteId}`,
			{
				headers,
			}
		);
		console.log(res.data);
		quote = res.data;
	} catch (error) {
		console.log('Trouble fetching quote on the server');
	}

	return quote;
};
