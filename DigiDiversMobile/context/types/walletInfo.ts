import { PublicKey } from "@solana/web3.js";

interface WalletInfo {
  address: string;
  authToken: string;
  publicKey: PublicKey;
}

interface NftInfo {
  totalDigis: number;
  maxDigi: DigiInfo;
}

interface DigiInfo {
  name: string;
  attributes: NftAttributes;
  imageUrl: string;
  symbol: string;
}

interface NftAttributes {
  Level: string;
  Rating: string;
  Experience: string;
}

export type { WalletInfo, NftInfo, DigiInfo, NftAttributes };
