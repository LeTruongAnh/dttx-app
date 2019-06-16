import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import VideoScreen from '../screens/VideoScreen'

export default createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Video: { screen: VideoScreen },
}, {
    initialRouteName: 'Login',
    headerMode: 'none',
  })
