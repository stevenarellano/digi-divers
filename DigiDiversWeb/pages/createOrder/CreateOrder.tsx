import React, { useState } from 'react';
import styles from '/styles/modules/CreateOrder.module.scss';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import { useRouter } from 'next/router';

type FileState = [any, (file: any) => void];

const CreateOrder: React.FC = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('data-classification');
    const [dataZip, setDataZip]: FileState = useState(null);
    const [examplesZip, setExamplesZip]: FileState = useState(null);
    const [resourcesUrl, setResourcesUrl] = useState('');
    const [prompt, setPrompt] = useState('');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log({ title, type, dataZip, examplesZip, resourcesUrl, prompt });
        // Perform submit action here

        if (!publicKey) {
            alert("no wallet connected");
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        let signature: TransactionSignature = '';
        try {

            // Create instructions to send, in this case a simple transfer
            const instructions = [
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: Keypair.generate().publicKey,
                    lamports: 1_000_000,
                }),
            ];

            // Get the lates block hash to use on our transaction and confirmation
            let latestBlockhash = await connection.getLatestBlockhash();

            // Create a new TransactionMessage with version and compile it to legacy
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();

            // Create a new VersionedTransacction which supports legacy and v0
            const transation = new VersionedTransaction(messageLegacy);

            // Send transaction and await for signature
            signature = await sendTransaction(transation, connection);

            // Send transaction and await for signature
            await connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed');

            console.log(signature);
            alert({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            alert({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>New Submission</h2>
            <div className={styles.inputContainer}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                >
                    <option value="data-classification">Data Classification</option>
                    <option value="text-sentiment">Text Sentiment</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="dataZip">Data Zip:</label>
                <input
                    type="file"
                    id="dataZip"
                    accept=".zip"
                    onChange={(event: any) => setDataZip(event.target.files[0])}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="examplesZip">Examples Zip:</label>
                <input
                    type="file"
                    id="examplesZip"
                    accept=".zip"
                    onChange={(event: any) => setExamplesZip(event.target.files[0])}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="resourcesUrl">Extra Resources URL:</label>
                <input
                    type="text"
                    id="resourcesUrl"
                    value={resourcesUrl}
                    onChange={(event) => setResourcesUrl(event.target.value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="prompt">Prompt:</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value
                    )}
                />
            </div>
            <div className={styles.submitContainer}>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default CreateOrder;