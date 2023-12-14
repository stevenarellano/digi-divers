import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const SwitchNavigator = createSwitchNavigator(
	{
		Auth: AuthNavigator,
		App: AppNavigator,
	},
	{
		initialRouteName: 'Auth',
	}
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
// https://heartbeat.comet.ml/how-authentication-flow-works-in-react-native-apps-using-react-navigation-4-x-a30bb4d9e5d6
