import { Dimensions } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

export default {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  isSmallDevice: WINDOW_WIDTH < 375,
};
