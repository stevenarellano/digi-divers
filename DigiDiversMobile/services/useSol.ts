import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useRecoilValue } from "recoil";
import { walletState } from "../context";
import { getPublicKeyFromAddress } from "./helper";
import useLocalWallet from "./useLocalWallet";
import {
  Web3MobileWallet,
  transact,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

const useSol = () => {
  const { connection } = useConnection();
  const { authorizeWallet } = useLocalWallet();
  const wallet = useRecoilValue(walletState);

  const fetchSolBalance = async (pubkey: PublicKey) => {
    const balance = await connection.getBalance(pubkey);
    console.log(balance);
    return balance / 1000000000;
  };

  //   work in progress
  const submitTransaction = async () => {
    let fromPubkey = getPublicKeyFromAddress(wallet.address);
    let toPubkey = getPublicKeyFromAddress(
      "4kzFkYPO//WjZ7JKI5pJU7hBrOGS59tOPatTimjl8gg=",
    );
    console.log(fromPubkey);

    const instruction = [
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: 1000000000,
      }),
    ];
    console.log(instruction);
    const latestBlockhash = await connection.getLatestBlockhash();
    console.log("blockhash: " + latestBlockhash.blockhash);
    const messageLegacy = new TransactionMessage({
      payerKey: fromPubkey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: instruction,
    }).compileToLegacyMessage();

    const txn = new VersionedTransaction(messageLegacy);
    const data = Buffer.from(messageLegacy.serialize()).toString("base64");

    console.log(data);

    // for some reason, doesn't work on mobile emulator
    await transact(async (walletProvider: Web3MobileWallet) => {
      console.log(`wallet.authToken:  ${wallet.authToken}`);
      await walletProvider.reauthorize({
        auth_token: wallet.authToken,
      });
      try {
        const c = await walletProvider.signAndSendTransactions({
          transactions: [txn],
        });
        console.log(c);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return { fetchSolBalance, submitTransaction };
};

export default useSol;
