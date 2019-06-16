import React from 'react'
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { Header, Title, Body, Accordion, Content, Icon } from 'native-base'
import navigator from '../navigation/CustomNavigator'
import config from '../../config.js'
import SocketIOClient from 'socket.io-client/dist/socket.io.js'

const { width } = Dimensions.get('window')

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      dataList: [],
      selectName: '',
    }
    this.socket = SocketIOClient(config.host, { jsonp: false })
    this.socket.on('api:fail', error => console.log(error))
    this.socket.on('user:getGroupsSuccess', dataList => {
      this.setState({
        dataList: dataList
      })
    })
    this.socket.on('livestream:returnLink', section => {
      navigator.navigate('Video', {
        selectName: this.state.selectName,
        section: section
      })
    })
    this.getLivestream = this.getLivestream.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._renderContent = this._renderContent.bind(this)
  }

  _renderHeader(item, expanded) {
    return (
      <View style={styles.titleView}>
        <Text style={styles.titleText}>
          {" "}{item.code + ' ' + item.year}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    )
  }

  _renderContent(item) {
    return (
      <View>
        {
          item.courses.map((x, idx) => <Text key={idx} style={styles.contentView}
            onPress={() => this.getLivestream(x.groupId)}>
            {x.groupId && x.groupId.courseId.fullname + '-' + x.groupId.courseId.code + ' (' + (x.groupId.teacherId && x.groupId.teacherId.lastName + ' ' + x.groupId.teacherId.firstName) + ')'}
          </Text>)
        }
      </View>
    )
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, value) => {
      this.setState({
        user: JSON.parse(value)
      }, () => {
        this.socket.emit('user:getGroups', this.state.user._id)
      })
    })
  }

  getLivestream(group) {
    let selectName = group && group.courseId.fullname + '-' + group.courseId.code + ' (' + (group.teacherId && group.teacherId.lastName + ' ' + group.teacherId.firstName) + ')';
    this.setState({ selectName: selectName })
    this.socket.emit('livestream:getLink', { groupId: group._id })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Body>
            <Title>Trang chủ</Title>
          </Body>
        </Header>
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={this.state.dataList}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleView: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: config.lightPrimaryColor,
    borderRadius: 5,
    marginVertical: 2,
  },
  titleText: { fontWeight: "600" },
  contentView: {
    backgroundColor: "#e3f1f1",
    padding: 10,
    fontStyle: "italic",
    marginLeft: 10,
    borderRadius: 5,
    marginVertical: 2
  },
})
