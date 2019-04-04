import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import ImagePlaceholder from '../../../components/imagePlaceholder'
import LinearGradient from 'react-native-linear-gradient'
import SvgIcon from 'react-native-svg-iconfont'
import WaveLoading from '../../../components/wave'
import { TopModel } from '../model'
import { inject, observer } from 'mobx-react'
import utils from '../../../utils'
import moment from 'moment'
import * as iconPath from '../../../source/svg'
const { width, height } = Dimensions.get('window')
@inject('account', 'app')
@observer
class MvTopList extends Component {
  TopModel = new TopModel()
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'MV排行榜'
    }
  }
  async componentDidMount () {
    await this.TopModel.getTopList(false, 50)
  }

  goPage = (detail) => {
    const { navigation } = this.props
    navigation.navigate('TopListDetail', { detail })
  }

  loadMore = async () => {

  }

  render () {
    return (
      this.TopModel.topList.length > 0
        ? <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <FlatList
            ListHeaderComponent={<View style={{ marginVertical: 10 }}>
              <Text style={{ marginHorizontal: 10, color: '#666', fontSize: 13 }}>最近更新:{moment().diff(moment(this.TopModel.updateTime), 'days') !== 0 ? moment(this.TopModel.updateTime).format('MoDo') : '今天' }</Text>
            </View>}
            keyExtractor={(item, index) => `${index}`}
            data={this.TopModel.topList.slice()}
            renderItem={(data) => <ListItem data={data} />}
            ItemSeparatorComponent={() => <View style={{ width, height: 4, backgroundColor: '#fff' }} />}
          />
        </SafeAreaView>
        : <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <Loading style={{ marginTop: 100 }} />
        </View>
    )
  }
}

const ListItem = (props) => {
  const { data } = props
  const { item, index } = data
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View>
        <ImagePlaceholder
          source={{ uri: item.cover }}
          style={{ width, height: width / 2 }}
        />
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, right: 0, width: '100%', justifyContent: 'flex-end', borderRadius: 3, paddingTop: 4, paddingRight: 6 }}>
          <SvgIcon path={iconPath.mvPlayOut} size={11} fill={['#fff']} />
          <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>{utils.Tools.processNum(item.playCount)}</Text>
        </LinearGradient>
        <View style={{ bottom: 0, left: 0, right: 0, position: 'absolute', paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 20, color: index < 3 ? '#ce3d3a' : '#fff', fontWeight: '500', lineHeight: 20 }}><Text>{`${index < 9 ? 0 : ''}`}</Text>{`${index + 1}`}</Text>
            <Text style={{ color: '#fff', marginLeft: 6, fontSize: 10, lineHeight: 20 }}>{`${item.lastRank - (index + 1) === 0 ? '-' : item.lastRank - (index + 1) > 0 ? '↑' : '↓'}`}<Text>{`${Math.abs(item.lastRank - (index + 1))}`}</Text></Text>
          </View>
          <Text numberOfLines={1} style={{ marginVertical: 12, color: '#fff' }}>{`${item.name} - ${item.artistName}`}</Text>
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

export default MvTopList
