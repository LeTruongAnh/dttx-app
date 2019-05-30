import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  
} from 'react-native';
import config from '../../config.js';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

export default class Home extends React.Component {
  static navigationOptions = {
    headerTitle: 'Tổng quan khóa học',
    headerStyle: {
      backgroundColor: config.primaryColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => {alert('ddmm')}}
      >
        <View style={{ width: 40, height: 40 }}/>
      </TouchableOpacity>
      // <Button
      //   onPress={() => alert('This is a button!')}
      //   title="Info"
      //   color="#fff"
      // />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      dataList: [],
      semesterNum: -1,
    }
    this.socket = SocketIOClient(config.host, { jsonp: false });
    this.socket.on('api:fail', error => console.log(error));
    this.socket.on('user:getGroupsSuccess', dataList => {
      this.setState({
        dataList: dataList
      }, () => console.log(this.state.dataList[1].courses));
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
    console.log(this.props.navigation.getChildNavigation)
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  setSemesterNum(num) {
    if (this.state.semesterNum !== num)
      this.setState({ semesterNum: num });
    else
      this.setState({ semesterNum: -1 });
  }

  render() {
    return (
      <View>
        <Button title="Sign me out :)" onPress={this._signOutAsync} />
        {
          (this.state.dataList.length > 0) ?
            <View>
              <Text>Tổng quan các khóa học</Text>
              {
                this.state.dataList.map((semester, idx) => <View key={idx} >
                  <Text onPress={() => this.setSemesterNum(idx)} >{semester.code}</Text>
                  {
                    (this.state.semesterNum === idx) ?
                      <View>
                        {
                          semester.courses.map((course, idx1) => <View key={idx1}>
                            <Text>{course.groupId.courseId.code}</Text>
                          </View>)
                        }
                      </View> : null
                  }
                </View>)
              }
            </View> : <Text>Không có khóa học!</Text>
        }
      </View>
    );
  }
}
