import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import ImagePlaceholder from '../../components/imagePlaceholder'
import LinearGradient from 'react-native-linear-gradient'
import utils from '../../utils'
import WaveLoading from '../../components/wave'
import SvgIcon from 'react-native-svg-iconfont'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import ParallaxStickListView from '../../components/parallaxStickView'
import { inject, observer } from 'mobx-react'
import { PlaylistModel } from './model'
import * as iconPath from '../../source/svg'
const { width, height } = Dimensions.get('window')
@inject('account', 'app')
@observer
class PlaylistDetail extends Component {
  PlaylistModel = new PlaylistModel()
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  async componentDidMount () {
    const { navigation } = this.props
    const { state = {} } = navigation
    const { params = {} } = state
    const { detail = {} } = params
    await this.PlaylistModel.getList(detail.id)
  }

  onLeftPress = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  goPage = (detail = {}, route = 'AudioScreen') => {
    const { navigation } = this.props
    console.log(detail)
    navigation.navigate(route, { detail })
  }

  renderFourTab = (comment = '评论', share = '分享') => {
    let tabs = [
      {
        icon: <SvgIcon path={iconPath.comments} size={22} fill={['#fff']} />,
        label: comment
      },
      {
        icon: <SvgIcon path={iconPath.share} size={20} fill={['#fff']} />,
        label: share
      },
      {
        icon: <SvgIcon path={iconPath.download} size={20} fill={['#fff']} />,
        label: '下载'
      },
      {
        icon: <SvgIcon path={iconPath.mSelect} size={20} fill={['#fff']} />,
        label: '多选'
      }
    ]
    return tabs.map((item, index) =>
      <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center' }} key={index}>
        {item.icon}
        <Text style={{ fontSize: 12, color: '#ffffff90', marginTop: 8 }}>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { navigation } = this.props
    const { state = {} } = navigation
    const { params = {} } = state
    const { detail = {} } = params
    const { playlistDetail, trackList, loading } = this.PlaylistModel
    const { creator = {} } = detail
    const { shareCount = 0, commentCount = 0, subscribedCount = 0, playCount = 0, description = '' } = playlistDetail
    return (
      <View style={{ flex: 1 }}>
        <ParallaxStickListView
          headerDefaultTitle={'歌单'}
          listContainerStyle={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
          leftPress={this.onLeftPress}
          backgroundImage={{ uri: detail.coverImgUrl }}
          blurRadius={60}
          ListHeader={<View style={{ width }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 18, paddingTop: 20 }}>
              <ImagePlaceholder source={{ uri: detail.coverImgUrl }} style={{ width: width / 3, height: width / 3, borderRadius: 3 }} />
              <View style={{ flex: 1, marginLeft: 18, justifyContent: 'space-between', paddingTop: 14, paddingBottom: 8 }}>
                <Text style={{ color: '#fff', fontSize: 16, lineHeight: 16 }}>{detail.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <ImagePlaceholder source={{ uri: creator.avatarUrl }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                    <Text style={{ color: '#ffffff80', marginHorizontal: 6 }}>{creator.nickname}</Text>
                  </View>
                  <SimpleLine
                    name={'arrow-right'}
                    size={12}
                    color={'#ffffff80'}
                  />
                </View>
                <Text style={{ color: '#ffffff80', fontSize: 12, lineHeight: 18 }} numberOfLines={2}>{description}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 28, marginTop: 18, marginBottom: 10 }}>
              {this.renderFourTab(utils.Tools.processNum(commentCount), utils.Tools.processNum(shareCount))}
            </View>
          </View>}
          headerTitle={detail.name}
          ListFooter={
            loading ? <View style={{ backgroundColor: '#fff', width, height }}><Loading style={{ marginTop: 80 }} /></View> : null
          }
          scrollImageHeight={400}
          sections={trackList}
          renderItem={(data) => {
            return <ListItem data={data} goPage={this.goPage} />
          }}
          renderStickHeader={() =>
            <View style={{ backgroundColor: '#fff',
              flexDirection: 'row',
              overflow: 'hidden',
              width,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              paddingLeft: 10,
              height: 41,
              alignItems: 'center'
            }}>
              <SvgIcon path={iconPath.topPlay} fill={['#333']} size={20} />
              <View style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' }} >
                <View>
                  <Text>播放全部<Text style={{ color: '#999' }}> (共{trackList[0].data.length}首)</Text></Text>
                </View>
                <LinearGradient
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  colors={['#fb5143', '#ce3d3a']}
                  style={{ height: '100%', width: width / 3, justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>＋</Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>收藏 {`(${utils.Tools.processNum(subscribedCount)})`}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          }
        />
      </View>
    )
  }
}

const ListItem = (props) => {
  const { data, goPage } = props
  const { item, index } = data
  return (
    <TouchableOpacity onPress={() => goPage(item)} activeOpacity={0.7} style={{ backgroundColor: '#fff',
      flexDirection: 'row',
      overflow: 'hidden',
      width,
      paddingTop: 12,
      paddingLeft: 10
    }}>
      <View>
        <Text style={{ fontSize: 17, color: index < 3 ? '#ce3d3a' : '#999' }}><Text>{`${index < 9 ? 0 : ''}`}</Text>{`${index + 1}`}</Text>
      </View>
      <View style={{ flex: 1, height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' }} >
        <View>
          <Text numberOfLines={1} style={{ fontSize: 16 }}>{item.name}</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, color: '#999', marginVertical: 6 }}>{item.ar[0].name} - item.al.name</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Loading = (props) => {
  const { style } = props
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <WaveLoading baseHeight={[4, 16, 2, 10]} targetHeight={[10, 4, 16, 2]} lineColor={'#ce3d3a'}
        lineStyle={{ marginRight: 2, width: 1 }} />
      <Text style={{ fontSize: 13, color: '#888', marginTop: 8 }}>正在加载...</Text>
    </View>
  )
}

export default PlaylistDetail
