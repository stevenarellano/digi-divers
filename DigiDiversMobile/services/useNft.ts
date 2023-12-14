import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  DigiInfo,
  NftInfo,
  digiState,
  walletState,
} from "../context";
import axios from "axios";

const useNft = () => {
  const wallet = useRecoilValue(walletState);
  const [digi, setDigi] = useRecoilState<DigiInfo>(digiState);

  const fetchDigiInfo = async (walletAddress: string): Promise<DigiInfo> => {
    console.log(`wallet: ${JSON.stringify(walletAddress)}`);
    const { data } = await axios.post(`${BASE_URL}/api/fetchDigi`, {
      walletAddress: walletAddress,
    });

    console.log(`nft: ${JSON.stringify(data.maxDigi)}`);

    if (data.totalDigis === 0) {
      return {
        name: "No Digi Found",
      } as DigiInfo;
    }
    const { maxDigi } = data;

    setDigi(maxDigi);
    return maxDigi;
  };

  return { fetchDigiInfo };
};

export default useNft;
