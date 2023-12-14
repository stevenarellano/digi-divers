import { useConnection } from "@solana/wallet-adapter-react";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { useRecoilState } from "recoil";
import { WalletInfo, walletState } from "../context";
import { getPublicKeyFromAddress } from "./helper";

const useLocalWallet = () => {
  const { connection } = useConnection();
  const [wallet, setWallet] = useRecoilState(walletState);

  const authorizeWallet = async (): Promise<string> => {
    let res: string = "";
    await transact(async (walletProvider) => {
      const auth = await walletProvider.authorize({
        cluster: "devnet",
        identity: {
          // icon: "../assets/logo.png",
          name: "DigiDivers",
        },
      });
      updateLocalWallet(auth.accounts[0].address, auth.auth_token);
      console.log(auth);
      res = auth.accounts[0].address;
    });
    return res;
  };

  const updateLocalWallet = async (address: string, authToken: string) => {
    const publicKey = getPublicKeyFromAddress(address);

    const walletInfo: WalletInfo = {
      address,
      authToken,
      publicKey,
    };

    setWallet(walletInfo);
  };

  return { updateLocalWallet, authorizeWallet };
};

export default useLocalWallet;
