import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  DigiInfo,
  LabeledData,
  NftAttributes,
  UploadLabeledResponse,
  digiState,
  walletState,
} from "../context";
import axios from "axios";

interface UploadLabelDataRequest {
  walletAddress: string;
  labeledData: LabeledData;
  nftAttributes: NftAttributes;
}

interface FetchExampleRequest {
  task_id: number;
}

interface ExampleData extends LabeledData {}

const useLabel = () => {
  const wallet = useRecoilValue(walletState);
  const [digi, setDigi] = useRecoilState(digiState);

  const fetchToLabel = async (): Promise<LabeledData> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/fetchToLabel`);
      const { data } = response;
      // console.log(`Fetched data: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch labeled data");
    }
  };

  const uploadLabel = async (labeledData: LabeledData) => {
    let res: UploadLabeledResponse = { result: 0 };

    const formData: UploadLabelDataRequest = {
      walletAddress: wallet.address || "",
      nftAttributes: digi.attributes,
      labeledData,
    };

    try {
      const { data } = await axios.post(`${BASE_URL}/api/uploadLD`, formData);
      res = data;
      if (res.newAttributes) {
        console.log(`Uploaded label: ${JSON.stringify(res.newAttributes)}`);
        setDigi({ ...digi, attributes: res.newAttributes });
      }
      if (res.result === 0) {
        console.log(`You earned ${JSON.stringify(res.solEarned)} SOL`);
      } else if (res.result === 1) {
        console.log(
          `leveled up! You are now level ${res.newAttributes?.Level}`,
        );
      }
    } catch (error) {
      console.error(`the following error occurred:\n ${error}`);
    }

    return res;
  };

  const fetchExample = async (task_id: number): Promise<ExampleData> => {
    const fetchExampleRequest: FetchExampleRequest = {
      task_id,
    };

    try {
      const resposne = await axios.post(
        `${BASE_URL}/api/fetchExample`,
        fetchExampleRequest,
      );
      const { data } = resposne;
      // console.log(`Fetched example: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch example data");
    }
  };

  return { uploadLabel, fetchToLabel, fetchExample };
};

export default useLabel;
