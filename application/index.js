import React, { Component } from 'react'
import { View, StatusBar, UIManager, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Stores, { useStores } from './stores'
import { createStackNavigator } from '@react-navigation/stack'
import { observer, Provider, inject } from 'mobx-react'
import { create } from 'mobx-persist'
import Orientation from 'react-native-orientation'
// import Navigator from './navigator.config'
import MainStackScreen from './router/MainStackScreen'
import Modals from './router/ModalScreen'
import {
  InitialState,
  useLinking,
  NavigationContainer
  , useTheme
} from '@react-navigation/native'
import utils from './utils'
import { navigationRef } from './utils/rootNavigation'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const hydrate = create({ storage: AsyncStorage })
const RootStack = createStackNavigator()
// 在正式环境中清空console.log()
if (!__DEV__) {
  global.console = {
    info: () => {
    },
    log: () => {
    },
    warn: () => {
    },
    error: () => {
    }
  }
}

const getActiveRouteName = state => {
  const route = state.routes[state.index]

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state)
  }

  return route.name
}

function Navigator () {
  const [initialState, setInitialState] = React.useState(InitialState)
  const [currentRoute, setCurrentRoute] = React.useState('MainTabBar')
  const routeNameRef = React.useRef()

  React.useEffect(() => {
    const state = navigationRef.current.getRootState()
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state)
  }, [])
  return (
    <>
      <StatusBar
        hidden={currentRoute === null || (Platform.OS === 'ios' && currentRoute === 'VideoDetail')}
        StatusBarAnimation='fade'
        backgroundColor='#ce3d3a'
        barStyle='light-content'
      />
      <NavigationContainer
        ref={navigationRef}
        initialState={initialState}
        onStateChange={state => {
          const previousRouteName = routeNameRef.current
          const currentRouteName = getActiveRouteName(state)

          if (previousRouteName !== currentRouteName) {
            // The line below uses the @react-native-firebase/analytics tracker
            // Change this line to use another Mobile analytics SDK
            console.log(previousRouteName, currentRouteName)
            setCurrentRoute(currentRouteName)
          }

          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName
        }}
      >
        <RootStack.Navigator mode='modal' initialRouteName='Main'>
          <RootStack.Screen
            name='Main'
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name='MyModal' component={Modals} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  )
}

const App = () => {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  Orientation.unlockAllOrientations()
  const { account = undefined, app = undefined } = useStores()
  async function initApp () {
    await hydrate('authToken', account)
    await hydrate('appTheme', app)
    await hydrate('playMode', app)
    app.init(account.authToken, app.appTheme)
  }


  React.useEffect(() => {
    initApp()
  }, [])
  return (
    <Provider {...Stores}>
      <>
        <Navigator />
      </>
    </Provider>
  )
}

export default App
