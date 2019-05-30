import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  AsyncStorage,
} from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import config from '../../config.js';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.socket = SocketIOClient(config.host, { jsonp: false });
    this.socket.on('user:auth-changed', ({ error, user }) => {
      if (error) console.log(error);
      else if (user) {
        console.log('this.socket.user',user._id);
        this._signInAsync(user);
      }
    });
  }

  handleEmail = (text) => {
    this.setState({ email: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  loginUser = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    this.socket.emit('user:login', data)
  }

  _signInAsync = async (user) => {
    console.log(user)
    await AsyncStorage.setItem('user', JSON.stringify(user));
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>ĐTTX</Text>
        </View>
        <View style={styles.formInput}>
          <TextInput style={styles.input}
            underlineColorAndroid='transparent'
            placeholder='Email'
            placeholderTextColor='#222222'
            autoCapitalize='none'
            onChangeText={this.handleEmail} />
          <TextInput style={styles.input}
            underlineColorAndroid='transparent'
            placeholder='Mật khẩu'
            placeholderTextColor='#222222'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={this.handlePassword} />
          <Button title='Đăng nhập' onPress={this.loginUser} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: config.primaryColor,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formInput: {
    flex: 2,
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 8,
    borderColor: '#BBC0C4',
    borderWidth: 1,
    width: '100%',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 40,
  }
})
