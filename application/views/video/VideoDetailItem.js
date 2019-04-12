import React from 'react'
import utils from '../../utils'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  ActivityIndicator,
  Platform
} from 'react-native'
import moment from 'moment'
import ImagePlaceholder from '../../components/imagePlaceholder'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
const { width, height } = Dimensions.get('window')

class StickHeader extends React.PureComponent {
  render () {
    const { data = {} } = this.props
    return (
      <TouchableOpacity activeOpacity={1} style={{ paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', paddingVertical: 8, backgroundColor: '#fff' }}>
        <ImagePlaceholder source={{ uri: 'https://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg' }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        <Text style={{ color: '#333', marginLeft: 10 }}>{data.artistName}</Text>
      </TouchableOpacity>
    )
  }
}

class VideoSimiItem extends React.PureComponent {
  render () {
    const { data = {}, loadData } = this.props
    const { data: val = [] } = data
    return (
      <View>
        <View style={{ width, height: 6, backgroundColor: '#f7f7f7' }} />
        <View style={{ paddingHorizontal: 18, marginTop: 14 }}>
          <Text style={{ color: '#333', fontWeight: '500' }}>{data.title}</Text>
          <View style={{ marginTop: 14 }}>
            {
              val.map((item, index) => (
                <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', marginBottom: 10 }} key={index}
                  onPress={() => loadData(item.id)}>
                  <View>
                    <ImagePlaceholder source={{ uri: item.cover }} style={{ width: width / 3, height: width / 6, borderRadius: 3 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, right: 0, width: '100%', justifyContent: 'flex-end', borderRadius: 3, paddingTop: 4, paddingRight: 6 }}>
                      <SvgIcon path={iconPath.mvPlayOut} size={11} fill={['#fff']} />
                      <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>{utils.Tools.processNum(item.playCount)}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text numberOfLines={2} style={{ lineHeight: 18 }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: '#888', marginTop: 10 }}>
                      <Text>{utils.Tools.videoDuration(item.duration / 1000)}</Text>，
                      <Text>{item.artistName}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

class VideoTopItem extends React.PureComponent {
  render () {
    const { data = {} } = this.props
    const { data: val = [] } = data
    return (
      <View>
        <View style={{ width, height: 6, backgroundColor: '#f7f7f7' }} />
        <View style={{ paddingLeft: 18, marginTop: 14 }}>
          <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 0.7 }}>
            <Text style={{ color: '#333', fontWeight: '500', marginBottom: 14 }}>{data.title}</Text>
            <View>
              {val.map((item, index) => (
                <CommentsItem key={index} data={item} index={index} lastIndex={val.length - 1} />
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class VideoCommentItem extends React.PureComponent {
  render () {
    const { data = {} } = this.props
    const { data: val = [] } = data
    return (
      <View style={{ paddingLeft: 18, marginTop: 14 }}>
        <Text style={{ color: '#333', fontWeight: '500', marginBottom: 14 }}>{data.title}</Text>
        <View>
          {val.map((item, index) => (
            <CommentsItem key={index} data={item} index={index} lastIndex={val.length - 1} />
          ))}
        </View>
      </View>
    )
  }
}

const CommentsItem = (props) => {
  const { data = {}, index, lastIndex } = props
  return (
    <View style={{ marginTop: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ImagePlaceholder source={{ uri: data.user.avatarUrl }} style={{ width: 30, height: 30, borderRadius: 15 }} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 8, paddingRight: 18 }}>
          <View>
            <Text style={{ color: '#666', fontSize: 12 }}>{data.user.nickname}</Text>
            <Text style={{ color: '#999', fontSize: 10 }}>{
              moment().diff(moment(data.time), 'years') > 0
                ? moment(data.time).format('YYYYMoDo') : moment(data.time).format('MoDo')
            }</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {data.likedCount > 0 ? <Text style={{ fontSize: 12, color: '#888', marginRight: 4 }}>{data.likedCount}</Text> : null}
            <SvgIcon path={iconPath.like} size={14} fill={['#888']} />
          </View>
        </View>
      </View>
      <View style={{ paddingLeft: 38 }}>
        <View style={{ paddingVertical: 14, borderBottomColor: '#ddd', borderBottomWidth: index === lastIndex ? 0 : 0.7 }}>
          <View style={{ paddingRight: 18 }}>
            <Text style={{ fontSize: 13, color: '#333', lineHeight: 18, marginRight: 18 }}>{data.content}</Text>
            {
              data.beReplied.length > 0
                ? <TouchableOpacity activeOpacity={1} style={{ marginTop: 14 }}>
                  <Text style={{ color: '#477aac', fontSize: 12 }}>{data.beReplied.length}条回复 ></Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export {
  VideoSimiItem,
  VideoTopItem,
  VideoCommentItem,
  StickHeader
}
