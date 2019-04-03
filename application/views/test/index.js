/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  LayoutAnimation,
  NativeModules,
  ListView,
  FlatList
} from 'react-native'
import ParallaxView from '../../components/parallax-view'
const contrast = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

export default class TestScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      data: [1, 2, 3]
    }
  }

  render () {
    const { navigation } = this.props
    const { state = {} } = navigation
    const { params = {} } = state
    return (
      <View style={styles.container} >
        <ParallaxView
          enableEmptySections
          dataSource={contrast.cloneWithRows(this.state.data)}
          onEndReachedThreshold={0.1}
          // renderFooter={() => FooterView}
          renderRow={(row) =>
            <TouchableOpacity onPress={() => {
              params.callback(row)
              navigation.goBack()
            }
            }>
              <View style={{ height: 44, width: '100%' }}><Text>{`item${row}`}</Text></View>
            </TouchableOpacity>
          }
          leftPress={() => this.props.navigation.goBack()}
          renderAlwaysCenter={() =>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Text style={[{ color: '#fff', fontSize: 16, fontWeight: '600' }]}>{'测试'}</Text>
                <View style={{ height: 1.6, borderRadius: 2, marginVertical: 8, backgroundColor: '#fff' }} />
              </View>
              <Text style={{ color: '#fff' }}>{'描述'}</Text>
            </View>
          }
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  }

})
