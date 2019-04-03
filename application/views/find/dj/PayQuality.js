import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import ImagePlaceholder from '../../../components/imagePlaceholder'
import WaveLoading from '../../../components/wave'
import { DjModel } from '../model'
import { inject, observer } from 'mobx-react'
const { width, height } = Dimensions.get('window')
const ImagePadding = 8
const listPaddingHorizontal = 16
const ImageColumn = 3
const ImageWidthAndHeight = (width - listPaddingHorizontal - ImagePadding) / ImageColumn
@inject('account', 'app')
@observer
class PayQuality extends Component {
  DjModel = new DjModel()
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '付费精品'
    }
  }
  async componentDidMount () {
    await this.DjModel.getPayQualityList()
  }
  constructor (props) {
    super(props)
    const { source } = props
    this.onEndReachedCalledDuringMomentum = true
  }

  loadMore = async () => {
    if (!this.DjModel.payQualityHasMore) return null
    if (this.DjModel.payQualityLoadMore || this.onEndReachedCalledDuringMomentum) return null
    await this.DjModel.getPayQualityList(true)
    this.onEndReachedCalledDuringMomentum = true
  }

  render () {
    return (
      this.DjModel.payQualityList.length > 0
        ? <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={this.DjModel.payQualityList.slice()}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
            onEndReached={({ distanceFromEnd }) => this.loadMore(distanceFromEnd)}
            renderItem={(data) => <ListItem data={data} />}
            ListFooterComponent={<View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {
                !this.DjModel.payQualityHasMore ? <Text style={{ fontSize: 13, color: '#666', marginVertical: 20 }}>到底啦， 请期待更多优质平台～</Text> : this.DjModel.payQualityLoadMore ? <Loading style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }} /> : null
              }

            </View>}
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
    <View style={{ flexDirection: 'row', marginTop: 4, paddingLeft: 6 }}>
      <ImagePlaceholder source={{ uri: item.picUrl }} style={{ width: ImageWidthAndHeight, height: ImageWidthAndHeight, borderRadius: 3 }} />
      <View style={{ marginLeft: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd', paddingVertical: 16, justifyContent: 'space-between', flex: 1 }}>
        <Text style={{ fontSize: 15, color: '#333', fontWeight: '600' }}>{item.name}</Text>
        <View>
          <Text style={{ fontSize: 12, color: '#666' }}>{item.rcmdText}</Text>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 6 }}>最新上架</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#ce3d3a' }}>¥{(item.originalPrice / 100)}</Text>
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

export default PayQuality
