import { PublicKey } from '@solana/web3.js';
import { freezeAccount } from '@solana/spl-token';
import { SOL_CONNECTION, WALLET } from '../../../constants';

/**
 *
 * @param userAccount User account to freeze
 * @returns NFT with the new level
 */
export async function freezeUserAccount(userAccount: PublicKey): Promise<void> {
    await freezeAccount(SOL_CONNECTION, WALLET, userAccount, userAccount, WALLET.publicKey);
}
