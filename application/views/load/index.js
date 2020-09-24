import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default class LoadingScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }
}
