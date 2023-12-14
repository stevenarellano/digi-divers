import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { secret } from '../../assets';
import {
	Metaplex,
	bundlrStorage,
	keypairIdentity,
} from '@metaplex-foundation/js';

export const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
export const DEVNET_ENDPOINT = clusterApiUrl('devnet');

export const SOL_CONNECTION = new Connection(
	clusterApiUrl('devnet'),
	'confirmed',
);
export const METAPLEX: Metaplex = Metaplex.make(SOL_CONNECTION)
	.use(keypairIdentity(WALLET))
	.use(
		bundlrStorage({
			address: 'https://devnet.bundlr.network',
			providerUrl: DEVNET_ENDPOINT,
			timeout: 60000,
		}),
	);

/*
	.0005 SOL converts to roughtly .008 USD
	if 5 levels, then MAX_BONUS is 5 * .1 * .0005 SOL = .00025 SOL = .0044 USD

	so at max level, you can earn 1.0044 USD per label (0.0124)

	we will charge .015 per label, so we will have at least a revenue of .0026 USD per data point
*/
export const EARNED_PER_LABEL = 0.0005;
export const LEVEL_MULTIPLIER = 0.1;

// leveling info
export const XP_PER_LABEL = 1;
export const REQUIRED_EXPERIENCE = 10;

export const MOBILE_ADDR_BASE64 =
	'Jz1tzYIdgKZm6Tte4NFt3NDU++11/iX87D9OoKHcmig=';
export const MOBILE_ADDR_BASE58 =
	'3eBEErwbiMkqEQCCEKBZjAFt8CsKMbVdv45bTgxvUL95';
