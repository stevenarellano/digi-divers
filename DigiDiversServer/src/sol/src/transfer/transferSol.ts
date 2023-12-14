import {
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
    PublicKey,
    Signer,
} from '@solana/web3.js';
import { SOL_CONNECTION } from '../../../constants';

/**
 * Function to send SOL to multiple users in a mapping address -> amount
 * @param from - The signer account
 * @param base58Address - The address of the recipient in base58 format
 * @param solAmount - The amount of SOL to transfer
 */
export async function transferSolToUser(
    from: Signer,
    base58Address: string,
    solAmount: number
): Promise<void> {
    // Set up transaction
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: new PublicKey(base58Address),
            lamports: solAmount * LAMPORTS_PER_SOL,
        })
    );

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(SOL_CONNECTION, transaction, [from]);

    console.log('SIGNATURE', signature);
}
