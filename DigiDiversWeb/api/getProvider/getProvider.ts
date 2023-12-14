export const getProvider = async () => {
	if ('phantom' in window) {
		const provider = (window.phantom as any).solana;

		if (provider?.isPhantom) {
			return provider;
		} else {
			console.log('Phantom not detected');
		}
	}

	window.open('https://phantom.app/', '_blank');
};

export default getProvider;
