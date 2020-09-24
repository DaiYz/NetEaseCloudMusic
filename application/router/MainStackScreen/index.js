import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from '../BottomTabScreen'
import { stacks } from '../../views'
import { TouchableOpacity } from 'react-native'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
const MainStack = createStackNavigator()

const _HEADER_BACK_BUTTON = (navigation) => {
  console.log(navigation, '???')
  return (<TouchableOpacity
    activeOpacity={0.7}
    style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }}
    onPress={() => navigation.goBack()}
  >
    <SimpleLine name='arrow-left' size={20} color='#fff' />
  </TouchableOpacity>)
}

export default function MainStackScreen ({ navigation }) {
  return (
    <MainStack.Navigator
      initialRouteName='App'
      screenOptions={
        {
          headerTitleAlign: 'center',
          headerStyle: {
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'transparent',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#ce3d3a',
            borderBottomColor: 'transparent',
            elevation: 0
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 17 },
          headerBackTitleVisible: false,
          headerLeft: () => _HEADER_BACK_BUTTON(navigation)
        }
      }
    >
      <MainStack.Screen name='App' component={BottomTab} options={{ headerShown: false }} />
      {
        stacks.map((item, index) =>
          <MainStack.Screen
            key={index}
            name={item.name} component={item.component} options={item.options}
          />
        )
      }

    </MainStack.Navigator>
  )
}
