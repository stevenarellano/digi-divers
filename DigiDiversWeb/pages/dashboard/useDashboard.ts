import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { queryInfoState } from '../../context';
import { getQuote } from '../../api';

export const advancedFilterOptions = [
	'device_name',
	'payload',
	'location',
	'data_type',
];

export const useDashboard = () => {
	const [countLimit, setCountLimit] = useState(1000);
	const [startDate, setStartDate] = useState(
		new Date(0).toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(
		new Date().toISOString().slice(0, 10)
	);
	const [advancedFilters, setAdvancedFilters] = useState([]) as any;
	const [error, setError] = useState('');
	const router = useRouter();
	const setQueryInfo = useSetRecoilState(queryInfoState);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let hasError = false;
		if (!countLimit) {
			setError('Please enter a count limit.');
			hasError = true;
		}
		if (!startDate) {
			setError('Please enter a start date.');
			hasError = true;
		}
		if (!endDate) {
			setError('Please enter an end date.');
			hasError = true;
		}

		const start = new Date(startDate);
		const end = new Date(endDate);

		const advancedFiltersObject = advancedFilters.reduce(
			(obj: any, item: { parameter: any; value: any }) =>
				Object.assign(obj, { [item.parameter]: item.value }),
			{}
		);

		if (!hasError && start <= end) {
			const body = {
				period: [start.toISOString(), end.toISOString()],
				queries: advancedFiltersObject,
				limit: countLimit,
			};
			console.log(body);
			const quoteId = await getQuote(body);
			if (quoteId.length) {
				setQueryInfo({
					period: body.period,
					queries: body.queries,
					count: body.limit,
				});
				router.push({
					pathname: '/payment',
					query: { quoteId: quoteId },
				});
			} else {
				setError('No quoteId returned from server. Please try again.');
			}
		}
	};

	const handleAddFilter = () => {
		setAdvancedFilters([...advancedFilters, { parameter: '', value: '' }]);
	};

	const handleRemoveFilter = (index: number) => {
		const newFilters = [...advancedFilters];
		newFilters.splice(index, 1);
		setAdvancedFilters(newFilters);
	};

	const handleFilterChange = (e: any, index: number) => {
		const newFilters = [...advancedFilters];
		if (e.target.name === 'parameter') {
			newFilters[index].parameter = e.target.value;
		} else {
			newFilters[index].value = e.target.value;
		}
		setAdvancedFilters(newFilters);
	};

	return {
		countLimit,
		setCountLimit,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		advancedFilters,
		setAdvancedFilters,
		error,
		setError,
		handleSubmit,
		handleAddFilter,
		handleRemoveFilter,
		handleFilterChange,
		advancedFilterOptions,
	};
};
