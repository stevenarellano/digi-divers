import { atom } from "recoil";
import { DigiInfo } from "../types";

const LEVEL_URI = [
  "https://arweave.net/CRROZQoi94RzKgX8mp4O-ATpg5NVXJUq4cxSH3Kqm0Y",
];

const digiState = atom<DigiInfo>({
  key: "digiState",
  default: {
    name: "DIGIDIVER",
    attributes: {
      Level: "1",
      Rating: "9999",
      Experience: "1",
    },
    imageUrl: LEVEL_URI[0],
    symbol: "DIGI",
  },
});

export default digiState;
