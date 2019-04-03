import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { inject, observer } from 'mobx-react'

@inject('account', 'app')
@observer
export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pwd: ''
    };
  }

  textChange(e) {
    this.setState({[e.inputType]: e.text})
  }

  render () {
    const {app, account} = this.props
    return (
      <View style={{ flex: 1 }}>
        <NewInput
          inputType={'userName'}
          onChangeText={this.textChange.bind(this)}
        />
        <NewInput
          inputType={'pwd'}
          onChangeText={this.textChange.bind(this)}
        />
        <View>
          <Text>{`用户名: ${this.state.userName}`}</Text>
          <Text>{`密码: ${this.state.pwd}`}</Text>
        </View>
      </View>
    )
  }
}


class NewInput extends React.Component{
  render(){
    const {onChangeText,inputType} = this.props
    return(
      <View>
        <TextInput
          style={{borderColor: 'red', borderWidth: 1}}
          onChangeText={(e) => onChangeText({text:e, inputType})}
          placeholder="请输入账号"
        />
      </View>
    )
  }
}