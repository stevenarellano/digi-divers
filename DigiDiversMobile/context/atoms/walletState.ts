import { PublicKey } from "@solana/web3.js";
import { atom } from "recoil";

const walletState = atom({
  key: "walletState",
  default: {
    address: "",
    authToken: "",
    publicKey: PublicKey.unique(),
  },
});

export default walletState;
