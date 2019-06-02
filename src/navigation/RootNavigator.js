import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import CourseScreen from '../screens/CourseScreen'
import VideoScreen from '../screens/VideoScreen'

export default createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Course: { screen: CourseScreen },
  Video: { screen: VideoScreen },
}, {
    initialRouteName: 'Login',
    headerMode: 'none',
  })
