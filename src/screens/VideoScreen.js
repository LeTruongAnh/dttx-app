import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Video } from 'expo'
import config from '../../config.js'

const { width } = Dimensions.get('window')

export default class VideoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mute: false,
      shouldPlay: true,
    }
    this.player = React.createRef()
  }

  render() {
    // let link = !this.props.navigation.state.params.section.link ? null : `${config.host}/live/${this.props.navigation.state.params.section._id}.flv?sign=${this.props.navigation.state.params.section.link.livestream.split('?')[1]}`;
    // let link = !this.props.navigation.state.params.section ? null : `${config.host}/live/5cfb6c06ac5fed34722f3fdf.flv?${this.props.navigation.state.params.section.split('?')[1]}`;
    let link = (this.props.navigation.state.params.section && this.props.navigation.state.params.section._id) ? `${config.host}/live/${this.props.navigation.state.params.section._id}/index.m3u8` : null
    console.log(link)
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: 'center' }}>
            {this.props.navigation.state.params.selectName}
          </Text>
          <Video
            source={{ uri: link }}
            shouldPlay={link ? true : false}
            resizeMode="cover"
            style={{ width, height: 300, backgroundColor: 'black' }}
          />
          <View style={styles.controlBar}></View>
        </View>
        <Text style={{ textAlign: 'center' }}>
          {link ? 'Đang livestream' : 'Livestream hiện không có'}
        </Text>
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
