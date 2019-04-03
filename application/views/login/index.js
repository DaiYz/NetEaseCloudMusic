import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Splash from 'react-native-splash-screen'
import { observer, inject } from 'mobx-react'

@inject('account')
@observer
class LoginScreen extends React.Component {
  componentDidMount () {
    setTimeout(() => Splash.hide(), 100)
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>请登录!</Text>
        <TouchableOpacity onPress={() => this.props.account.login()}>
          <Text>登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen
