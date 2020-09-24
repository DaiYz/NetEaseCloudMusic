import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import Find from '../../views/find'
import Video from '../../views/video'
import Mine from '../../views/mine'
import Friends from '../../views/friends'
import Account from '../../views/account'

const BottomTabs = createBottomTabNavigator()

export default function BottomTabScreen () {
  return (
    <BottomTabs.Navigator
      initialRouteName='Message'
      tabBarOptions={{
        activeTintColor: '#ce3d3a'
      }}
      screenOptions={{
        tabBarButton: props => <TouchableOpacity activeOpacity={0.7} {...props} />
      }}
    >
      <BottomTabs.Screen
        name='Find'
        component={Find}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <SvgIcon path={iconPath.easy} size={20} fill={focused ? ['#ce3d3a'] : ['#666']} />
          ),
          tabBarLabel: '发现'
        }}
      />
      <BottomTabs.Screen
        name='Video' component={Video}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <SvgIcon path={iconPath.video} size={20} fill={focused ? ['#ce3d3a'] : ['#666']} />
          ),
          tabBarLabel: 'MV'
        }}
      />
      <BottomTabs.Screen
        name='Mine' component={Mine}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <SvgIcon path={iconPath.music} size={20} fill={focused ? ['#ce3d3a'] : ['#666']} />
          ),
          tabBarLabel: '我的'
        }}
      />
      <BottomTabs.Screen
        name='Friends'
        component={Friends}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <SvgIcon path={iconPath.friends} size={20} fill={focused ? ['#ce3d3a'] : ['#666']} />
          ),
          tabBarLabel: '朋友'
        }}
      />
      <BottomTabs.Screen
        name='Account' component={Account}
        options={{
          title: '拼团专区',
          tabBarIcon: ({ focused, color, size }) => (
            <SvgIcon path={iconPath.account} size={20} fill={focused ? ['#ce3d3a'] : ['#666']} />
          ),
          tabBarLabel: '账户',
          tabBarBadge: '99+'
        }}
      />

    </BottomTabs.Navigator>
  )
}
