import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, AsyncStorage } from 'react-native'
import { Button } from 'native-base'
import navigator from '../navigation/CustomNavigator'
import SocketIOClient from 'socket.io-client/dist/socket.io.js'
import config from '../../config.js'

const { width } = Dimensions.get('window')

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorText: '',
    }
    this.socket = SocketIOClient(config.host, { jsonp: false });
    this.socket.on('user:auth-changed', ({ error, user }) => {
      if (error) this.setState({ errorText: error });
      else if (user) {
        this._signInAsync(user);
      }
    });
    this.loginUser = this.loginUser.bind(this)
    this._signInAsync = this._signInAsync.bind(this)
  }

  loginUser = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    this.socket.emit('user:login', data)
    navigator.reset('Home')
  }

  _signInAsync = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigator.reset('Home')
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>DTTX</Text>
        <View style={styles.input}>
          <TextInput style={styles.textInput}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
            autoCapitalize='none'
            placeholderTextColor="#868A91"
          />
        </View>
        <View style={styles.input}>
          <TextInput style={styles.textInput}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Mật khẩu'}
            autoCapitalize='none'
            placeholderTextColor="#868A91"
            secureTextEntry={true}
          />
        </View>
        {
          (this.state.errorText) ?
            <Text style={styles.errorText}>{'* ' + this.state.errorText}</Text> : null
        }
        <Button block onPress={this.loginUser} >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    width: width - 32,
    height: 44,
    marginBottom: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  textInput: {
    color: '#ffffff',
    flex: 1
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    color: '#f68207',
  },
})
