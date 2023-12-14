import { createStackNavigator } from "react-navigation-stack";
import { Login } from "../screens";

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: "Login",
  },
);

export default AuthNavigation;
