const isWalletConnected = async () => {
	let addr = '';
	try {
		const solana = (window as any).solana;
		if (solana) {
			if (solana.isPhantom) {
				console.log('phantom wallet found');
				// When using this flag, Phantom will only connect and emit a connect event if the application is trusted. Therefore, this can be safely called on page load for new users, as they won't be bothered by a pop-up window even if they have never connected to Phantom before.
				// if user already connected, { onlyIfTrusted: true }
				const response = await solana.connect({ onlyIfTrusted: false });
				console.log('public key', response.publicKey.toString());

				addr = response.publicKey.toString();
			} else {
				alert('Please install phantom wallet');
			}
		}
	} catch (error) {
		console.log(error);
	}

	return addr;
};

export default isWalletConnected;
