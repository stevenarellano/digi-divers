import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
	PublicKey,
	SystemProgram,
	TransactionMessage,
	TransactionSignature,
	VersionedTransaction,
} from '@solana/web3.js';
import { toUint8Array } from 'js-base64';
import { AddOrderFormData, BASE_URL, ESCROW_ADDR_BASE_58 } from '../../context';
import axios from 'axios';
import { usePhantom } from '../usePhantom';

const getPublicKeyFromAddress = (address: string): PublicKey => {
	// address is base64 encoded
	const publicKeyByteArray = toUint8Array(address);
	return new PublicKey(publicKeyByteArray);
};

const useAddOrder = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const { getBase58WalletAddress } = usePhantom();

	const sendSolToEscrow = async (sol: number) => {
		let signature: TransactionSignature = '';
		try {
			const instructions = [
				SystemProgram.transfer({
					fromPubkey: publicKey!,
					toPubkey: new PublicKey(ESCROW_ADDR_BASE_58),
					lamports: sol * 1000000000,
				}),
			];
			// Get the lates block hash to use on our transaction and confirmation
			let latestBlockhash = await connection.getLatestBlockhash();

			// Create a new TransactionMessage with version and compile it to version 0
			const messageV0 = new TransactionMessage({
				payerKey: publicKey!,
				recentBlockhash: latestBlockhash.blockhash,
				instructions,
			}).compileToV0Message();

			// Create a new VersionedTransacction to support the v0 message
			const transation = new VersionedTransaction(messageV0);

			// Send transaction and await for signature
			signature = await sendTransaction(transation, connection);

			// Await for confirmation
			await connection.confirmTransaction(
				{ signature, ...latestBlockhash },
				'confirmed',
			);

			console.log(signature);
		} catch (error) {
			console.error(`the following error occurred:\n ${error}`);
		}
		return signature;
	};

	const options = { headers: { 'Content-Type': 'multipart/form-data' } };
	const sendFormData = async (formData: AddOrderFormData) => {
		const request: AddOrderFormData = {
			...formData,
			walletAddress: getBase58WalletAddress(),
		};

		let status = 0;
		try {
			const response = await axios.post(
				`${BASE_URL}/api/uploadUD`,
				request,
				options,
			);
			console.log(response);
		} catch (error) {
			console.error(`the following error occurred:\n ${error}`);
		}

		return status;
	};

	return { sendSolToEscrow, sendFormData };
};

export default useAddOrder;
