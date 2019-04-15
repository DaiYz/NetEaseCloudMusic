import React, { Component } from 'react'
import { View, StatusBar, AsyncStorage, UIManager, Platform } from 'react-native'
import Stores from './stores'
import { observer, Provider, inject } from 'mobx-react'
import { create } from 'mobx-persist'
import Orientation from 'react-native-orientation'
import Navigator from './navigator.config'
import utils from './utils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const hydrate = create({ storage: AsyncStorage })

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
    await hydrate('authToken', account)
    await hydrate('appTheme', app)
    app.init(account.authToken, app.appTheme)
  }

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
