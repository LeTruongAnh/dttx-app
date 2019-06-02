import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Video } from 'expo'

const { width } = Dimensions.get('window')

export default class VideoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mute: false,
      shouldPlay: true,
    }
  }

  // handlePlayAndPause = () => {
  //   this.setState((prevState) => ({
  //     shouldPlay: !prevState.shouldPlay
  //   }));
  // }

  // handleVolume = () => {
  //   this.setState(prevState => ({
  //     mute: !prevState.mute,
  //   }));
  // }

  componentDidMount() {
    console.log(this.props.navigation.state.params)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: 'center' }}> ĐTTX Video </Text>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            shouldPlay={true}
            resizeMode="cover"
            style={{ width, height: 300, backgroundColor: 'black' }}
          />
          <View style={styles.controlBar}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
})
