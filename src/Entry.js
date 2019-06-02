import React from 'react'
import { Root } from 'native-base'
import RootNavigator from './navigation/RootNavigator'
import navigator from './navigation/CustomNavigator'
import { Font } from 'expo'

export default class Entry extends React.Component {
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({ loading: false });
  }
  
  render() {
    return (
      <Root>
        <RootNavigator
          ref={(ref) => {
            navigator.setContainer(ref)
          }}
        />
      </Root>
    )
  }
}
