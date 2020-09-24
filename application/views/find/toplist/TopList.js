import React, { Component } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import ImagePlaceholder from '../../../components/imagePlaceholder'
import WaveLoading from '../../../components/wave'
import { TopListModel } from '../model'
import { inject, observer } from 'mobx-react'
const { width, height } = Dimensions.get('window')
const ImagePadding = 6
const listPaddingHorizontal = 12
const ImageColumn = 3
const ImageWidthAndHeight = (width - listPaddingHorizontal - ImagePadding) / ImageColumn
@inject('account', 'app')
@observer
class TopList extends Component {
  TopListModel = new TopListModel()
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '排行榜'
    }
  }
  async componentDidMount () {
    await this.TopListModel.getTopList()
  }

  goPage = (detail) => {
    const { navigation } = this.props
    navigation.navigate('TopListDetail', { detail })
  }

  render () {
    console.log(this.TopListModel.newTopList)
    return (
      this.TopListModel.topList.length > 0
        ? <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={this.TopListModel.newTopList}
            renderItem={(data) => {
              const { index } = data
              if (index === 0) {
                return <OfficialItem data={data} goPage={this.goPage} />
              }
              return <GlobalItem data={data} goPage={this.goPage} />
            }}
          />
        </SafeAreaView>
        : <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <Loading style={{ marginTop: 100 }} />
        </View>
    )
  }
}

const OfficialItem = (props) => {
  const { data, goPage } = props
  const { item } = data
  return (
    <View style={{ paddingLeft: 6 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>官方榜</Text>
      </View>
      <View>
        {item.map((val, i) =>
          <TouchableOpacity onPress={() => goPage(val)} activeOpacity={0.7} key={i} style={{
            marginBottom: 3,
            flexDirection: 'row'
          }}>
            <ImagePlaceholder source={{ uri: val.coverImgUrl }} style={{
              width: (width - 12) / 3,
              height: (width - 12) / 3,
              borderRadius: 3
            }} />
            <View style={{ flex: 1,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: '#ddd',
              marginLeft: 8,
              paddingVertical: 16
            }}>
              <View style={{
                justifyContent: 'space-between',
                flex: 1,
                marginRight: 16
              }}>
                {
                  val.tracks.map((per, j) =>
                    <Text numberOfLines={1} key={j} style={{ fontSize: 13, color: '#666' }}>{j + 1}. <Text>{per.first} - <Text>{per.second}</Text></Text></Text>
                  )
                }
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const GlobalItem = (props) => {
  const { data, goPage } = props
  const { item } = data
  return (
    <View style={{ paddingHorizontal: 6, marginTop: 8 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>全球榜</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          item.map((val, i) =>
            <TouchableOpacity activeOpacity={0.7} onPress={() => goPage(val)} key={i} style={{ width: ImageWidthAndHeight, marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0, paddingBottom: 18 }}>
              <ImagePlaceholder source={{ uri: val.coverImgUrl }} style={{
                width: '100%',
                height: ImageWidthAndHeight,
                borderRadius: 3
              }} />
              <Text numberOfLines={2} style={{ fontSize: 12, color: '#333', marginTop: 8, marginLeft: 4, lineHeight: 16 }}>{val.name}</Text>
            </TouchableOpacity>
          )
        }
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

export default TopList

const styles = StyleSheet.create({
  titleContainer: {
    height: 41,
    marginTop: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600'
  }
})
