import { PublicKey } from '@solana/web3.js';
import { toUint8Array } from 'js-base64';
import { JsonAttribute, NftAttributes } from '../types';
import bs58 from 'bs58';

const getPublicKeyFromAddress = (address: string): PublicKey => {
    // address is base64 encoded
    const publicKeyByteArray = toUint8Array(address);
    return new PublicKey(publicKeyByteArray);
};

const base58Tobase64 = (address: string): string => {
    return 'implement me';
};

const base64ToBase58 = (address: string): string => {
    // Decode the Base64 string to a Uint8Array
    const decoded = Uint8Array.from(Buffer.from(address, 'base64'));

    // Convert the Uint8Array to a Base58 string
    const base58String = bs58.encode(decoded);

    return base58String;
};

function attributeArrayToObject(attributes: JsonAttribute[]): NftAttributes {
    return attributes.reduce((acc: any, curr: any) => {
        acc[curr.trait_type] = curr.value;
        return acc;
    }, {});
}

export { getPublicKeyFromAddress, base58Tobase64, attributeArrayToObject, base64ToBase58 };
