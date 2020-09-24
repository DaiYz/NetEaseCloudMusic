import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import SegmentedControl from '../../components/segmentedControl'
import SvgIcon from 'react-native-svg-iconfont'
import { FriendsModel } from './model'
import ImagePlaceholder from '../../components/imagePlaceholder'
import { observer } from 'mobx-react'
import utils from '../../utils'
import * as iconPath from '../../source/svg'
<<<<<<< HEAD
=======
import NavHeader from '../../components/navHeader'
>>>>>>> develop
const { width } = Dimensions.get('window')
const defaultContainerWidth = (width - 14 - 14)
const defaultImageWidth = defaultContainerWidth / 2
@observer
class FriendsScreen extends React.Component {
  FriendsModel = new FriendsModel()
  state={
    selectedIndex: 0
  }

  getWidthAndHeight = (item, len, index, fixWidth = 0) => {
    if (len === 1) {
      if (item.width === item.height) {
        return {
          width: defaultImageWidth,
          height: defaultImageWidth
        }
      }
      if (item.width < item.height) {
        return {
          width: defaultImageWidth,
          height: parseInt(item.height / (item.width / defaultImageWidth))
        }
      } else {
        return {
          width: parseInt(item.width / (item.height / defaultImageWidth)),
          maxWidth: (defaultContainerWidth - 4 - 42),
          height: defaultImageWidth
        }
      }
    } else {
      if (len === 2) {
        return {
          width: (defaultContainerWidth - 4 - 42 - fixWidth) / 2,
          height: (defaultContainerWidth - 4 - 42 - fixWidth) / 2,
          marginLeft: index === 1 ? 4 : 0
        }
      } else {
        return {
          width: (defaultContainerWidth - 8 - 42 - fixWidth) / 3,
          height: (defaultContainerWidth - 8 - 42 - fixWidth) / 3,
          marginHorizontal: (index % 3 === 1) ? 4 : 0
        }
      }
    }
  }

  render () {
    return (
<<<<<<< HEAD
      <View style={{ flex: 1 }}>
=======
      <>
        <NavHeader
          headerLeftIcon={<SvgIcon path={iconPath.addFriend} size={24} fill={['#fff']} />}
          headerRightIcon={<SvgIcon path={iconPath.voice} size={24} fill={['#fff']} />}
          headerTitle='动态'
          headerContainerStyle={{ backgroundColor: '#ce3d3a' }}
        />
>>>>>>> develop
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={this.FriendsModel.list.slice()}
          ItemSeparatorComponent={() => <View style={{ width, height: 0.6, backgroundColor: '#dfdfdf' }} />}
          renderItem={({ item, index }) => <ListItem data={item} getWidthAndHeight={this.getWidthAndHeight} />}
        />
<<<<<<< HEAD
      </View>
=======
      </>
>>>>>>> develop
    )
  }
}

const ListItem = (props) => {
  const { data, getWidthAndHeight } = props
  const { json = '', pics = [], user = {}, info = {}, rcmdInfo = {} } = data
  const { commentThread = {} } = info
  const { resourceInfo = {} } = commentThread
  let jsonObj = JSON.parse(json)
  let type = jsonObj.hasOwnProperty('song')
    ? 'song'
    : jsonObj.hasOwnProperty('playlist')
      ? 'playlist'
      : jsonObj.hasOwnProperty('video')
        ? 'video' : 'event'
  let Element = jsonObj.hasOwnProperty('song')
    ? Song
    : jsonObj.hasOwnProperty('playlist')
      ? PlayList
      : jsonObj.hasOwnProperty('video')
        ? Video : Event
  let len = pics.length
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 16 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 8 }}>
              <ImagePlaceholder source={{ uri: user.avatarUrl }} style={{ width: 30, height: 30, borderRadius: 15 }} />
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#477aac' }}>{user.nickname}</Text>
                <Text style={{ color: '#666', marginLeft: 8 }}>{resourceInfo?.name ? `${resourceInfo.name.split('：')[0]}:` : '发布视频:'}</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#999', marginTop: 4 }}>{rcmdInfo?.userReason ? rcmdInfo.userReason : utils.Tools.processTime(data.eventTime)}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, marginLeft: 42 }}>
          <View>
            <Text style={{ lineHeight: 24, marginBottom: 6 }}>{jsonObj.msg}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                pics.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} activeOpacity={0.7}>
                      <ImagePlaceholder source={{ uri: item.originUrl }} style={[getWidthAndHeight(item, len, index), { borderRadius: 3, marginBottom: 4 }]} />
                    </TouchableOpacity>
                  )
                }
                )
              }
            </View>
          </View>
          <Element item={jsonObj[type]} getWidthAndHeight={getWidthAndHeight} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Song = (props) => {
  const { item } = props
  const { album = {}, artists = [] } = item
  return (
    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 6, padding: 8, height: 56 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImagePlaceholder source={{ uri: album.img80x80 }} style={{ width: 40, height: 40, borderRadius: 4 }} />
        <View style={{ width: 16,
          height: 16,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255, 0.7)',
          position: 'absolute' }}>
          <SvgIcon path={iconPath.mvPlayIn} size={8} fill={['#ce3d3a']} />
        </View>
      </View>
      <View style={{ flex: 1, marginLeft: 8, justifyContent: 'space-between', height: '100%', paddingVertical: 3 }}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: '#333' }}>{item.name}</Text>
        <Text numberOfLines={1} style={{ fontSize: 11, color: '#888' }}>{artists[0].name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const PlayList = (props) => {
  const { item } = props
  const { creator, coverImgUrl } = item
  return (
    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 6, padding: 8, height: 56 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImagePlaceholder source={{ uri: coverImgUrl }} style={{ width: 40, height: 40, borderRadius: 4 }} />
      </View>
      <View style={{ flex: 1, marginLeft: 8, justifyContent: 'space-between', height: '100%', paddingVertical: 3 }}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: '#333' }}>{item.name}</Text>
        <Text numberOfLines={1} style={{ fontSize: 11, color: '#888' }}>{creator.nickname}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Video = (props) => {
  const { item } = props
  const { coverUrl } = item
  return (
    <TouchableOpacity activeOpacity={1} >
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
        <ImagePlaceholder source={{ uri: coverUrl }} style={{ width: defaultContainerWidth - 4 - 42, height: (defaultContainerWidth - 4 - 42) / 2, borderRadius: 4 }} />
        <SvgIcon path={iconPath.mvPlay} size={30} fill={['rgba(255,255,255,0.8)']} style={{ position: 'absolute' }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 0, right: 0, left: 0, justifyContent: 'space-between', paddingHorizontal: 8, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon path={iconPath.mvPlayOut} size={11} fill={['#fff']} />
            <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>{utils.Tools.processNum(item.playTime)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon path={iconPath.voice} size={11} fill={['#fff']} />
            <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>{utils.Tools.videoDuration(item.duration)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Event = (props) => {
  const { item, getWidthAndHeight } = props
  const { json, pics } = item
  let jsonObj = JSON.parse(json)
  const { msg, djRadio } = jsonObj
  console.log(jsonObj, item)
  return <TouchableOpacity activeOpacity={1} style={{ backgroundColor: '#eee', borderRadius: 6, padding: 8 }}>
    <View>
      <Text style={{ color: '#666', lineHeight: 30 }}>{msg}</Text>
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        pics.map((val, index) => {
          return (
            <TouchableOpacity key={index} activeOpacity={0.7}>
              <ImagePlaceholder source={{ uri: val.originUrl }} style={[getWidthAndHeight(val, pics.length, index, 16), { borderRadius: 3, marginBottom: 4 }]} />
            </TouchableOpacity>
          )
        }
        )
      }
    </View>
    <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row',
      padding: 8,
      backgroundColor: '#fff',
      borderRadius: 6,
      height: 56,
      alignItems: 'center'
    }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImagePlaceholder source={{ uri: djRadio.img80x80 }} style={{ width: 40, height: 40, borderRadius: 4 }} />
        <View style={{ width: 16,
          height: 16,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255, 0.7)',
          position: 'absolute' }}>
          <SvgIcon path={iconPath.mvPlayIn} size={8} fill={['#ce3d3a']} />
        </View>
      </View>
      <View style={{ flex: 1, marginLeft: 8, justifyContent: 'space-between', height: '100%', paddingVertical: 3 }}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: '#333' }}>{djRadio.name}</Text>
        <Text numberOfLines={1} style={{ fontSize: 11, color: '#888' }}>{djRadio.dj.nickname}</Text>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
}

export default FriendsScreen
