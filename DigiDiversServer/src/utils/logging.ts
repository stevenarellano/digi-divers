function truncateObject(obj: any, maxLength: number = 20): any {
	const truncatedObj = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			let value = obj[key].toString();

			value =
				value.length > maxLength
					? `${value.substring(0, maxLength - 3)}...`
					: value;

			(truncatedObj as any)[key] = value;
		}
	}

	return truncatedObj;
}

export { truncateObject };
