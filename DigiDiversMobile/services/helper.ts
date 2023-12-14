import { Base64EncodedAddress } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { PublicKey } from "@solana/web3.js";
import { toUint8Array } from "js-base64";

const getPublicKeyFromAddress = (address: Base64EncodedAddress): PublicKey => {
  const publicKeyByteArray = toUint8Array(address);
  return new PublicKey(publicKeyByteArray);
};

export { getPublicKeyFromAddress };
