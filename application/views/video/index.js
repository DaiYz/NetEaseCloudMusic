import React from 'react'
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { inject, observer } from 'mobx-react'
import SearchHeader from '../../components/searchHeader'
import ImagePlaceholder from '../../components/imagePlaceholder'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import utils from '../../utils'
import moment from 'moment'
import { MvModel } from './model'
const { width } = Dimensions.get('window')

@inject('account', 'app')
@observer
class VideoScreen extends React.Component {
  MvModel = new MvModel()
  constructor (props) {
    super(props)
    this.scrollY = new Animated.Value(0)
    this.state = {
      show: false,
      headerLeftShow: true
    }
  }

  async componentDidMount () {
    await this.MvModel.getMoveList()
  }

  goPage = (route = 'MvTopList', data = {}) => {
    const { navigation } = this.props
    navigation.navigate(route, data)
  }

  render () {
    const { app } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
        <SearchHeader
          isPlaying={false}
          headerLeftIcon={<SvgIcon path={iconPath.recode} size={26} fill={['#fff', '#fff']} />}
          onSearchPress={() => { this.setState({ showSearchHome: true }) }}
          onCancelPress={() => { this.setState({ showSearchHome: false }) }}
        />
        <FlatList
          ListHeaderComponent={
            <View style={{ marginTop: 10 }}>
              <QualityMv data={this.MvModel.qualityMvList.slice()} goPage={this.goPage} />
              <TopView data={this.MvModel.topMvList.slice()} updateTime={this.MvModel.updateTime} goPage={this.goPage} />
              <More />
            </View>
          }
          keyExtractor={(item, index) => `${index}`}
          data={this.MvModel.mvList.slice()}
          ItemSeparatorComponent={() => <View style={{ width, height: 6, backgroundColor: '#f5f5f5' }} />}
          renderItem={(data) => <ListItem data={data} goPage={this.goPage} />}
        />
      </View>
    )
  }
}

export default VideoScreen

const ListItem = (props) => {
  const { data, goPage } = props
  const { item } = data
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ paddingHorizontal: 8, paddingTop: 6 }} onPress={() => goPage('VideoDetail', { id: item.id })}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ImagePlaceholder
            source={{ uri: item.cover }}
            style={{ width: (width - 16), height: (width - 16) / 2, borderRadius: 4 }}
          />
        </View>
        <View style={{ marginVertical: 16 }}>
          <Text numberOfLines={1} style={{ fontSize: 15, color: '#333' }}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const QualityMv = (props) => {
  const { data, goPage } = props
  return (
    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd', paddingBottom: 16 }}>
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#333', marginRight: 8, marginVertical: 8 }}>MV精选</Text>
          <SimpleLine name={'arrow-right'} size={14} color={'#666'} />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            data.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => goPage('VideoDetail', { id: item.id })} activeOpacity={0.7} style={{
                width: (width - 20) / 2,
                paddingBottom: 20,
                marginRight: (index % 2 === 0) ? 4 : 0,
                overflow: 'hidden'
              }}>
                <ImagePlaceholder
                  source={{ uri: item.picUrl }}
                  borderRadius={3}
                  style={styles.cover} />
                <View style={{ paddingHorizontal: 4, marginTop: 6 }}>
                  <Text numberOfLines={1} style={{ fontSize: 13, color: '#333' }}>{item.name}</Text>
                  <Text numberOfLines={1} style={{ fontSize: 12, color: '#666' }}>{item.artistName}</Text>
                </View>
                <LinearGradient
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, right: 0, width: '100%', justifyContent: 'flex-end', borderRadius: 3, paddingTop: 4, paddingRight: 6 }}>
                  <SvgIcon path={iconPath.mvPlayOut} size={11} fill={['#fff']} />
                  <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>{utils.Tools.processNum(item.playCount)}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  )
}

const TopView = (props) => {
  const { data = [], updateTime, goPage } = props
  return (
    <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' }}>
      <TouchableOpacity
        onPress={() => goPage()}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 14
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: '500', color: '#333', marginRight: 8 }}>排行榜</Text>
            <SimpleLine name={'arrow-right'} size={10} color={'#999'} />
          </View>
          <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>{`更新时间：${moment(updateTime).format('MoDo')}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
          {
            data.map((item, index) => {
              if (index === 0) {
                return (
                  <View key={index} style={{ justifyContent: 'center', alignItems: 'center', elevation: 999, zIndex: 999 }}>
                    <ImagePlaceholder
                      source={{ uri: item.cover }}
                      style={{ width: (width - 20) / 4, height: (width - 20) / 8, borderRadius: 3 }}
                    />
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
                )
              } else {
                return (
                  <ImagePlaceholder key={index}
                    source={{ uri: item.cover }}
                    style={{ width: (width - 20) / 4, height: (width - 20) / 8 - 12, position: 'absolute', right: 12, borderRadius: 3 }}
                  />
                )
              }
            })
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

const More = (props) => {
  return (
    <View style={{ marginTop: 20, marginBottom: 14, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#333', marginRight: 8 }}>更多精彩MV</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cover: {
    width: (width - 20) / 2,
    height: (width - 20) / 4,
    borderRadius: 3
  }
})
