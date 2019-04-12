import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import WaveLoading from '../../components/wave'
import VideoPlayerContainer from '../../components/videoPlayer'
import { MvDetailModel } from './model'
import utils from '../../utils'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import { VideoSimiItem, VideoTopItem, VideoCommentItem, StickHeader } from './VideoDetailItem'
import { inject, observer } from 'mobx-react'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
const isIPhoneX = utils.Tools.isIPhoneX()
@inject('account', 'app')
@observer
class VideoDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { header: null }
  }
  MvDetailModel = new MvDetailModel()
  constructor (props) {
    super(props)
    this.getVideoButtons = this.getVideoButtons.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.onEndReachedCalledDuringMomentum = true
  }

  async componentDidMount (): void {
    const { navigation } = this.props
    const { state = {} } = navigation
    const { params = {} } = state
    await this.MvDetailModel.loadData(params.id)
  }

  getVideoButtons (obj) {
    const { likeCount = 0, subCount = 0, commentCount = 0, shareCount = 0 } = obj
    return [
      {
        icon: <SvgIcon path={iconPath.like} size={22} fill={['#333']} />,
        label: likeCount
      },
      {
        icon: <SvgIcon path={iconPath.mvFav} size={20} fill={['#333']} />,
        label: subCount
      },
      {
        icon: <SvgIcon path={iconPath.comments} size={20} fill={['#333']} />,
        label: commentCount
      },
      {
        icon: <SvgIcon path={iconPath.share} size={18} fill={['#333']} />,
        label: shareCount
      }
    ]
  }

  async loadMore () {
    if (!this.MvDetailModel.listHasMore) return null
    if (this.MvDetailModel.payQualityLoadMore || this.onEndReachedCalledDuringMomentum) return null
    await this.MvDetailModel.getCommentList(20, true)
    this.onEndReachedCalledDuringMomentum = true
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }} >
        <VideoPlayerContainer
          loading={this.MvDetailModel.loading}
          videoDuration={this.MvDetailModel.mvInfo.duration ? parseInt(this.MvDetailModel.mvInfo.duration / 1000) : 0}
          source={{ uri: this.MvDetailModel.mvUrl }}
          onNavLeftButtonPress={() => navigation.goBack()}
        >
          {
            this.MvDetailModel.loading
              ? <Loading style={{ marginTop: 40 }} />
              : <FlatList
                style={{ paddingBottom: isIPhoneX ? 34 : 0 }}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
                onEndReached={({ distanceFromEnd }) => this.loadMore(distanceFromEnd)}
                ListHeaderComponent={
                  <Header
                    data={this.MvDetailModel.mvInfo}
                    getVideoButtons={this.getVideoButtons}
                    showDesc={this.MvDetailModel.showDesc}
                    changeShowDesc={this.MvDetailModel.changeShow}
                  />
                }
                stickyHeaderIndices={[1]}
                data={this.MvDetailModel.ActList}
                renderItem={({ item }) => {
                  switch (item.type) {
                    case 'stick':
                      return <StickHeader data={this.MvDetailModel.mvInfo} />
                    case 'simi':
                      return <VideoSimiItem data={item} loadData={this.MvDetailModel.loadData} />
                    case 'hot':
                      return <VideoTopItem data={item} />
                    case 'comment':
                      return <VideoCommentItem data={item} />
                  }
                }
                }
                keyExtractor={(item, index) => `${index}`}
                ListFooterComponent={<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  {
                    !this.MvDetailModel.listHasMore ? <Text style={{ fontSize: 13, color: '#666', marginVertical: 20 }}>到底啦， 请期待更多优质平台～</Text> : this.MvDetailModel.loadMore ? <Loading style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }} /> : null
                  }

                </View>}
              />
          }

        </VideoPlayerContainer>
      </View>
    )
  }
}

export default VideoDetail

const Header = (props) => {
  const { data = {}, getVideoButtons, showDesc, changeShowDesc } = props
  const buttons = getVideoButtons(data)
  return (
    <View style={{ paddingVertical: 18, borderBottomWidth: 0.7, borderBottomColor: '#ddd' }}>
      <View style={{ paddingHorizontal: 18 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => changeShowDesc()} activeOpacity={1}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', lineHeight: 17 }}>{data.name}</Text>
          </View>
          <SvgIcon
            path={showDesc ? iconPath.up : iconPath.down} size={14} fill={['#333']}
          />
        </TouchableOpacity>
        <View style={{ marginVertical: 18 }}>
          <Text style={{ fontSize: 12, color: '#999' }}>{utils.Tools.processNum(data.playCount)}次观看</Text>
        </View>
        {
          showDesc
            ? <TouchableOpacity activeOpacity={1} onPress={() => changeShowDesc()}><View style={{ marginBottom: 10 }}>
              <Text style={{ color: '#666', fontSize: 13 }}>发行：{data.publishTime}</Text>
              <Text style={{ marginTop: 10, lineHeight: 16, color: '#666', fontSize: 13 }}>{data.desc}</Text>
            </View></TouchableOpacity>
            : null
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, marginTop: 10 }}>
          {buttons.map((item, index) => (
            <View key={index}>
              <TouchableOpacity activeOpacity={1} style={{ alignItems: 'center' }}>
                {item.icon}
                <Text style={{ fontSize: 12, color: '#999', marginTop: 3 }}>{utils.Tools.processNum(item.label)}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
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
