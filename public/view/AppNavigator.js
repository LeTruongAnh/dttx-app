import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import Home from './Home';
import SignIn from './SignIn';
import AuthLoading from './AuthLoading';

const AppStack = createStackNavigator({
  Home: { screen: Home },
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: SignIn,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));