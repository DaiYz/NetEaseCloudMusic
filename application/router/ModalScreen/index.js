import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
const ModalStack = createStackNavigator()

function ModalScreen1 ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 30 }}>This is a modal1!</Text>
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
      <Text style={{ fontSize: 30 }}>Test</Text>
      <Button onPress={() => navigation.push('App')} title='Dismiss' />
    </View>
  )
}

function ModalScreen2 ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 30 }}>This is a modal2!</Text>
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
    </View>
  )
}

function ModalScreen3 ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 30 }}>This is a modal3!</Text>
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
    </View>
  )
}

export default function ModalsScreen () {
  return (
    <ModalStack.Navigator headerMode='none'>
      <ModalStack.Screen name='ModalScreen1' component={ModalScreen1} />
      <ModalStack.Screen name='ModalScreen2' component={ModalScreen2} />
      <ModalStack.Screen name='ModalScreen3' component={ModalScreen3} />
    </ModalStack.Navigator>
  )
}
