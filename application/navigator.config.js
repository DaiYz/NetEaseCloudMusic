import React from 'react'
import { TouchableOpacity, Text, Dimensions, View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, StackViewTransitionConfigs } from 'react-navigation'
import Badge from './components/Badge'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import Views from './views'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from './source/svg'
import WaveLoading from './components/wave'
import Stores from './stores'
const { width } = Dimensions.get('window')
const _HEADER_BACK_BUTTON = (navigation) => {
  const { routeName } = navigation.state
  return (<TouchableOpacity
    activeOpacity={0.7}
    style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }}
    onPress={() => navigation.goBack()}
  >
    <SimpleLine name={'arrow-left'} size={23} color={'#fff'} />
  </TouchableOpacity>)
}

const _HEADER_RiGHT_BUTTON = (navigation) => {
  const { routeName, params = {} } = navigation.state
  const appTheme = params?.theme ? params.theme : Stores.app.theme
  const musicPlayNow = params?.playNow ? params.playNow : Stores.app.playNow
  return (
    !musicPlayNow.hasOwnProperty('id')
      ? <View style={{ top: 1, width: 54, paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }} />
      : <TouchableOpacity
        activeOpacity={0.7}
        style={{ top: 1, width: 54, paddingRight: 15, justifyContent: 'center', alignItems: 'flex-start' }}
        onPress={() => navigation.navigate('')}
      >
        {
          musicPlayNow.playing
            ? <WaveLoading lineColor={'#fff'} />
            : <SvgIcon path={iconPath.voice} size={30} fill={['#fff']} />
        }
      </TouchableOpacity>

  )
}

const MODAL_DEFAULT_OPTIONS = {
  mode: 'modal',
  headerMode: 'none'
}

const TAB_BAR_DEFAULT_OPTIONS = {
  defaultNavigationOptions: ({ navigation }) => {
    const tabBarOnPress = ({ navigation, defaultHandler }) => {
      defaultHandler()
    }
    const tabBarIcon = ({ focused, tintColor }) => {
      const { routeName, params = {} } = navigation.state
      const badge = params?.badge ? params.badge : Stores.account.userProfile.eventCount
      let iconName
      if (routeName === 'Find') {
        iconName = iconPath.easy
      } else if (routeName === 'Video') {
        iconName = iconPath.video
      } else if (routeName === 'Mine') {
        iconName = iconPath.music
      } else if (routeName === 'Friends') {
        iconName = iconPath.friends
      } else {
        return <View style={{ flexDirection: 'row', paddingTop: 4, paddingRight: 4 }}>
          <SvgIcon path={iconPath.account} size={25} fill={focused ? ['#ce3d3a'] : ['#666']} />
          <Badge
            style={{ position: 'absolute', top: 0, right: -6 }}
            number={badge}
          />
        </View>
      }
      return (<SvgIcon path={iconName} size={25} fill={focused ? ['#ce3d3a'] : ['#666']} />)
    }
    let title = ''
    const { routeName } = navigation.state
    if (routeName === 'Find') { title = '发现' } else
    if (routeName === 'Video') { title = 'MV' } else
    if (routeName === 'Mine') { title = '我的' } else
    if (routeName === 'Friends') { title = '朋友' } else { title = '账号' }

    return {
      tabBarOnPress,
      tabBarIcon,
      title
    }
  },
  tabBarOptions: {
    style: {
      borderTopWidth: 0.2,
      borderColor: '#f9f9f9',
      borderTopColor: '#aaa',
      backgroundColor: '#red',
      opacity: 1
    },
    labelStyle: {
      fontSize: 10
    },
    activeTintColor: '#ce3d3a',
    inactiveTintColor: '#aaa'
  }
}

const STACKNAVIGATOR_DEFAULT_OPTIONS = {
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName, params = {} } = navigation.state
    const appTheme = params?.theme ? params.theme : Stores.app.theme
    const musicPlayNow = params?.playNow ? params.playNow : Stores.app.playNow
    let options = {
      headerTitle: (
        null
      ),
      drawerLockMode: 'locked-closed',
      headerStyle: {
        backgroundColor: '#ce3d3a',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'transparent',
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
      headerTitleStyle: { fontSize: 17 },
      headerBackTitle: null
    }
    if (!('index' in navigation.state)) {
      options = { ...options, headerLeft: _HEADER_BACK_BUTTON(navigation), headerRight: _HEADER_RiGHT_BUTTON(navigation) }
    }
    return options
  }
}

const MainTabBar = createBottomTabNavigator({
  Find: Views.Find,
  Video: Views.Video,
  Mine: Views.Mine,
  Friends: Views.Friends,
  Account: Views.Account
}, {
  ...TAB_BAR_DEFAULT_OPTIONS,
  initialRouteName: 'Find'
})

/* 将Header设置到Tabbar */
MainTabBar.navigationOptions = ({ navigation }) => {
  const { state = {} } = navigation
  const { index = 0 } = state
  if (index === 0) return { header: null }
  if (index === 1) return { header: null }
  return {
    headerTitle:
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text style={{ fontSize: 16, color: '#fff' }}>
      {index === 3 ? '动态' : index === 4 ? '账号' : '我的音乐'}
    </Text>
  </View>,
    headerStyle: {
      backgroundColor: '#ce3d3a',
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'transparent',
      shadowOpacity: 0,
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
      elevation: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: { fontSize: 17, fontWeight: '600' },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ top: 1,
          width: 54,
          paddingLeft: 18,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
        onPress={() => {}
        }
      >
        {index === 4 ? null : <SvgIcon path={index === 2 ? iconPath.cloud : index === 3 ? iconPath.addFriend : iconPath.cloud} size={24} fill={['#fff']} />}
        {/* {index === 4 ? null : <Image source={Icon.Image} style={{width: 50, height: 40}}/>} */}
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ top: 1,
          width: 54,
          paddingRight: 18,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
        onPress={() => {}
        }
      >
        <SvgIcon path={iconPath.voice} size={24} fill={['#fff']} />
      </TouchableOpacity>

    )
  }
}

const ExtraViews = { ...Views, MainTabBar }
delete ExtraViews.Find
delete ExtraViews.Video
delete ExtraViews.Mine
delete ExtraViews.Friends
delete ExtraViews.Account
const AppNavigator = createStackNavigator({ ...ExtraViews }, { ...STACKNAVIGATOR_DEFAULT_OPTIONS, initialRouteName: 'MainTabBar' })

const IncludeModalContainerNavigator = createStackNavigator({
  Base: { screen: AppNavigator }
  /* add modal screen */
}, { ...MODAL_DEFAULT_OPTIONS })

const Base = createSwitchNavigator({
  Load: ExtraViews.Loading,
  App: IncludeModalContainerNavigator,
  Auth: ExtraViews.Login
}, { initialRouteName: 'Load' })

const AppContainer = createAppContainer(Base)

export default AppContainer
