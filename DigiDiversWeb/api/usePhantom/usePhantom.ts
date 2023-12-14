import { useWallet } from '@solana/wallet-adapter-react';
import { getProvider } from '../getProvider';

const usePhantom = () => {
	const { publicKey } = useWallet();

	const sendPhantomTransaction = async (cost: number, data_count: number) => {
		let status = false;
		try {
			const provider = await getProvider();
			await provider.connect();
			const message = `Click here to confirm paying ${cost} SOL for ${data_count} data points}`;
			const encodedMessage = new TextEncoder().encode(message);
			const signedMessage = await provider.signMessage(
				encodedMessage,
				'utf8',
			);
			if (signedMessage) {
				status = true;
			}
		} catch (error) {
			console.log(error);
		}
		return status;
	};

	const getBase58WalletAddress = (): string => {
		return publicKey?.toString() || '';
	};

	return { sendPhantomTransaction, getBase58WalletAddress };
};

export default usePhantom;
