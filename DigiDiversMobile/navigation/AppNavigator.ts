import { createStackNavigator } from "react-navigation-stack";
import {
  Returning,
  Profile,
  Mint,
  Labeling,
  Flagged,
  Signup,
} from "../screens";

const AppNavigator = createStackNavigator(
  {
    Returning: {
      screen: Returning,
      navigationOptions: { headerShown: false },
    },
    Signup: {
      screen: Signup,
      navigationOptions: { headerShown: false },
    },
    Mint: {
      screen: Mint,
      navigationOptions: { headerShown: false },
    },
    Labeling: {
      screen: Labeling,
      navigationOptions: { headerShown: false },
    },
    Flagged: {
      screen: Flagged,
      navigationOptions: {
        headerLeft: () => null,
        gestureEnabled: false,
      },
    },
    Profile: { screen: Profile, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: "Signup",
  },
);

export default AppNavigator;
