/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SectionList
} from 'react-native'
import NavItem from '../../components/naviItem'
import MineSection from './MineSection'
import { MineModel } from './model'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import { inject, observer } from 'mobx-react'
import ImagePlaceholder from '../../components/imagePlaceholder'
const { width } = Dimensions.get('window')

@inject('account', 'app')
@observer
class MineScreen extends Component {
  MineModel = new MineModel()
  constructor (props) {
    super(props)
    this.goPage = this.goPage.bind(this)
    this.mineHeaderList = [
      {
        icon: <SvgIcon path={iconPath.music} size={26} fill={['#333']} />,
        title: '本地音乐',
        num: 0
      },
      {
        icon: <SvgIcon path={iconPath.playRecently} size={26} fill={['#333']} />,
        title: '最近播放',
        num: 86
      },
      {
        icon: <SvgIcon path={iconPath.myFm} size={26} fill={['#333']} />,
        title: '我的电台',
        num: 0
      },
      {
        icon: <SvgIcon path={iconPath.myFav} size={26} fill={['#333']} />,
        title: '我的收藏',
        num: 1
      }
    ]
  }

  goPage (detail) {
    const { navigation } = this.props
    navigation.navigate('PlaylistDetail', { detail })
  }

  render () {
    const { account } = this.props
    const { userProfile = {} } = account
    const { userId = '' } = userProfile
    return (
      <View style={styles.container} >
        <SectionList
          keyExtractor={(item, index) => `${index}`}
          ListHeaderComponent={<ListHeader list={this.mineHeaderList} />}
          renderItem={({ item, index, section }) => {
            const isSelf = item.userId === userId
            return <ListItem isSelf={isSelf} item={item} goPage={this.goPage} />
          }}
          renderSectionHeader={({ section }) => {
            const { title, index } = section
            return <MineSection title={title} listNum={index === 0 ? this.MineModel.createList.length : this.MineModel.favList.length} isShowItem={this.MineModel.isShowItem} index={index} show={index === 0 ? this.MineModel.showCreate : this.MineModel.showFav} />
          }
          }
          stickySectionHeadersEnabled
          sections={this.MineModel.MineList}
        />
      </View>
    )
  }
}

const ListHeader = (props) => {
  const { list } = props
  return (
    <View style={{ paddingTop: 16 }}>
      {
        list.map((item, index) =>
          <NavItem
            key={index}
            itemStyle={{ height: 44 }}
            rightExtraTitle={<Text style={{ marginRight: 6, color: '#666', fontSize: 12 }}>{item.num}</Text>}
            showItemSeparator={index !== list.length - 1}
            leftIcon={
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14, marginLeft: 18 }}>{item.icon}</View>
            }
            itemTitle={item.title}
          />
        )
      }
      <View style={{ width, height: 6, backgroundColor: '#eee' }} />
    </View>
  )
}

const ListItem = (props) => {
  const { isSelf = false, item, goPage } = props
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ paddingLeft: 14, paddingRight: 8, flexDirection: 'row', marginBottom: 10 }}
      onPress={() => goPage(item)}>
      <ImagePlaceholder source={{ uri: item.coverImgUrl }} style={{ width: width / 7, height: width / 7, borderRadius: 3 }} />
      <View style={{ flex: 1, paddingLeft: 12, justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: '#333' }}>{isSelf ? '我喜欢的音乐' : item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={{ fontSize: 12, color: '#888' }}>{item.trackCount}首</Text>
          {isSelf ? null : <Text style={{ fontSize: 12, color: '#888' }}>, by {item.creator.nickname}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f5'
  }

})

export default MineScreen
