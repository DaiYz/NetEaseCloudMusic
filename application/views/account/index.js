import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import { inject, observer } from 'mobx-react'
import Badge from '../../components/Badge'
import NavItem from '../../components/naviItem'
import ImagePlaceholder from '../../components/imagePlaceholder'
import NavHeader from '../../components/navHeader'
const { width } = Dimensions.get('window')
const ACTIONS = ['动 态', '关 注', '粉 丝', '编辑资料']
@inject('account', 'app')
@observer
class AccountScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topButtons: [
        {
          title: '设置',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.setting} size={18} />
        },
        {
          title: '夜间模式',
          type: 'switch',
          icon: <SvgIcon fill={['#333']} path={iconPath.night} size={18} />
        },
        {
          title: '定时关闭',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.clock} size={18} />
        },
        {
          title: '音乐闹钟',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.alarmClock} size={18} />
        },
        {
          title: '扫一扫',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.scan} size={16} />
        }
      ],
      centerButtons: [
        {
          title: '在线听歌免流量',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.freeTraffic} size={18} />
        }, {
          title: '精品游戏推荐',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.gameRecommended} size={20} />
        }, {
          title: '优惠券',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.coupons} size={18} />
        }
      ],
      bottomButtons: [
        {
          title: '加入网易音乐人',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.joinMusic} size={20} />
        }, {
          title: '分享网易云音乐',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.share} size={16} />
        }, {
          title: '关于',
          type: 'normal',
          icon: <SvgIcon fill={['#333']} path={iconPath.about} size={18} />
        }
      ],
      items: [
        {
          title: '消息',
          icon: <SvgIcon fill={['#ce3d3a']} path={iconPath.message} size={24} />
        },
        {
          title: '商城',
          icon: <SvgIcon fill={['#ce3d3a']} path={iconPath.mall} size={24} />
        },
        {
          title: '演出',
          icon: <SvgIcon fill={['#ce3d3a']} path={iconPath.show} size={24} />
        },
        {
          title: '个性换肤',
          icon: <SvgIcon fill={['#ce3d3a']} path={iconPath.skin} size={24} />
        }
      ]

    }
  }

  textChange (e) {
    this.setState({ [e.inputType]: e.text })
  }

  render () {
    const { app, account } = this.props
    const { userProfile = {} } = account
    const { topButtons, centerButtons, bottomButtons, items } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <NavHeader
          headerRightIcon={<SvgIcon path={iconPath.voice} size={24} fill={['#fff']} />}
          headerTitle='账号'
          headerContainerStyle={{ backgroundColor: '#ce3d3a' }}
        />
        <ScrollView>
          <Header profile={userProfile} />
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 20 }}>
            {
              items.map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={{
                    flex: 1,
                    alignItems: 'center'
                  }}>
                    <View>
                      {item.icon}
                      {index === 0 ? <Badge
                        style={{ position: 'absolute', top: -9, right: -9 }}
                        number={userProfile.eventCount}
                      /> : null}
                    </View>
                    <Text style={{ fontSize: 13, color: '#333', marginTop: 10 }}>{item.title}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View style={{ marginTop: 8 }}>
            {
              topButtons.map((item, index) =>
                <NavItem
                  key={index}
                  itemTitle={item.title}
                  itemStyle={{ backgroundColor: '#fff', height: 46 }}
                  itemTitleStyle={{ fontSize: 15 }}
                  itemType={item.type}
                  leftIcon={
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14, marginLeft: 18 }}>{item.icon}</View>
                  }
                  showItemSeparator={index !== topButtons.length - 1}
                />
              )
            }
          </View>
          <View style={{ marginTop: 8 }}>
            {
              centerButtons.map((item, index) =>
                <NavItem
                  key={index}
                  itemStyle={{ backgroundColor: '#fff', height: 46 }}
                  itemTitleStyle={{ fontSize: 15 }}
                  itemTitle={item.title}
                  itemType={item.type}
                  leftIcon={
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14, marginLeft: 18 }}>{item.icon}</View>
                  }
                  showItemSeparator={index !== centerButtons.length - 1}
                />
              )
            }
          </View>
          <View style={{ marginTop: 8 }}>
            {
              bottomButtons.map((item, index) =>
                <NavItem
                  key={index}
                  itemTitle={item.title}
                  itemStyle={{ backgroundColor: '#fff', height: 46 }}
                  itemTitleStyle={{ fontSize: 15 }}
                  itemType={item.type}
                  leftIcon={
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14, marginLeft: 18 }}>{item.icon}</View>
                  }
                  showItemSeparator={index !== centerButtons.length - 1}
                />
              )
            }
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ height: 46,
              width,
              backgroundColor: '#fff',
              marginTop: 8,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{ color: '#ce3d3a' }}>退出登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default AccountScreen

const Header = (props) => {
  const { profile } = props
  return (
    <TouchableOpacity activeOpacity={1} style={{ marginBottom: 8, backgroundColor: '#fff', paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        <ImagePlaceholder source={{ uri: profile.avatarUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View style={{ marginLeft: 14 }}>
          <Text style={{ fontSize: 16, color: '#111' }}>{profile.nickname}</Text>
          <TouchableOpacity style={{ borderRadius: 10,
            height: 20,
            paddingHorizontal: 10,
            backgroundColor: '#eee',
            justifyContent: 'center',
            marginTop: 6
          }}>
            <Text style={{ fontSize: 12, color: '#999', fontWeight: 'bold' }}>Lv<Text>. 6</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 14, paddingBottom: 20 }}>
        {
          ACTIONS.map((item, index) => {
            let Element = null
            switch (index) {
              case 0:
                Element = <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}>1</Text>
                break
              case 1:
                Element = <Text style={{ fontSize: 16, fontWeight: '500' }}>{profile.follows}</Text>
                break
              case 2:
                Element = <Text style={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}>{profile.followeds}</Text>
                break
              case 3:
                Element = <SvgIcon fill={['#333']} path={iconPath.edit} size={18} />
                break
            }
            return (
              <TouchableOpacity key={index} style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderColor: '#ddd',
                borderRightWidth: index !== ACTIONS.length - 1 ? StyleSheet.hairlineWidth : 0
              }}>
                {Element}
                <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </TouchableOpacity>
  )
}
