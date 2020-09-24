import React, { Component } from 'react'
<<<<<<< HEAD
import { View, StatusBar, AsyncStorage, UIManager, Platform } from 'react-native'
import Stores from './stores'
import { observer, Provider, inject } from 'mobx-react'
import { create } from 'mobx-persist'
import Orientation from 'react-native-orientation'
import Navigator from './navigator.config'
import utils from './utils'
=======
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
>>>>>>> develop
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const hydrate = create({ storage: AsyncStorage })
<<<<<<< HEAD

=======
const RootStack = createStackNavigator()
>>>>>>> develop
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

<<<<<<< HEAD
@inject('app', 'account')
@observer
class HomeScreen extends Component {
  constructor (props) {
    super(props)
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    Orientation.unlockAllOrientations()
    this.state = {
      currentScreen: 'MainTabBar',
      prevScreen: null
    }
  }

  async componentDidMount () {
    const { app, account } = this.props
=======
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
>>>>>>> develop
    await hydrate('authToken', account)
    await hydrate('appTheme', app)
    await hydrate('playMode', app)
    app.init(account.authToken, app.appTheme)
  }

<<<<<<< HEAD
  getParentRoute (name, route) {
    let result = null
    for (var i = 0; i < route.routes.length; i++) {
      if (route.routes[i].routeName === name) {
        result = route
      } else if (route.routes[i].routes && route.routes[i].routes.length > 0) {
        result = this.getParentRoute(name, route.routes[i])
      }
      if (result !== null) return result
    }
  }

  getActiveRouteName (navigationState) {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route)
    }
    return route.routeName
  }

  render () {
    const { currentScreen } = this.state
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden={currentScreen === null || (Platform.OS === 'ios' && currentScreen === 'VideoDetail')}
          StatusBarAnimation={'fade'}
          backgroundColor={'#ce3d3a'}
          barStyle={'light-content'} />
        <Navigator
          ref={e => utils.global.navigator = e}
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = this.getActiveRouteName(currentState)
            const prevScreen = this.getActiveRouteName(prevState)
            this.setState({
              currentScreen,
              prevScreen
            })
          }}
        />
      </View>
    )
  }
}

export default class App extends Component<{}> {
  render () {
    return (
      <Provider {...Stores}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <HomeScreen />
        </View>
      </Provider>
    )
  }
}
=======
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
>>>>>>> develop
