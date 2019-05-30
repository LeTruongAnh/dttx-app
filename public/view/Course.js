import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import config from '../../config.js';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

export default class Course extends React.Component {
  static navigationOptions = {
    title: 'Danh sách khóa học',
    headerStyle: {
      backgroundColor: config.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    drawerLabel: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      groupList: [],
    }
    this.socket = SocketIOClient(config.host, { jsonp: false });
    this.socket.on('api:fail', error => console.log(error));
    this.socket.on('user:getGroupsSuccess', groupList => {
      this.setState({
        groupList: groupList
      }, () => console.log(this.state.groupList));
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, value) => {
      this.setState({
        user: JSON.parse(value)
      }, () => {
        this.socket.emit('user:getGroups', this.state.user._id);
      });
    });
    this.props.navigation.navigate('DrawerOpen');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        {
          (this.state.groupList.length > 0) ?
            <View>
              <Button title="Sign me out :)" onPress={this._signOutAsync} />
              <Text>Tổng quan các khóa học</Text>
              {/* {
                this.state.groupList.map()
              } */}
            </View> : <Text>Không có khóa học!</Text>
        }
      </View>
    );
  }
}
