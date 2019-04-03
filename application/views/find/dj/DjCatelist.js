import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import ImagePlaceholder from '../../../components/imagePlaceholder'
import WaveLoading from '../../../components/wave'
import { DjModel } from '../model'
import { inject, observer } from 'mobx-react'
const { width } = Dimensions.get('window')
@inject('account', 'app')
@observer
class DjCateList extends Component {
  DjModel = new DjModel()
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '电台分类'
    }
  }
  async componentDidMount () {
    await this.DjModel.getDjCateList()
  }
  constructor (props) {
    super(props)
    const { source } = props
    this.state = {
      image: source,
      loading: true,
      loadError: false
    }
  }

  render () {
    return (
      !this.DjModel.CateListLoading
        ? <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <ScrollView>
            <Footer data={this.DjModel.djCateList} />
          </ScrollView>
        </View>
        : <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <Loading style={{ marginTop: 100 }} />
        </View>
    )
  }
}

const FootItem = (props) => {
  const { data, index } = props
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.footItem}>
        <ImagePlaceholder source={{ uri: data[2 * index].pic56x56Url }} style={{ width: 25, height: 25 }} />
        <Text style={styles.item}>{data[2 * index].name}</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity activeOpacity={1} style={styles.footItem}>
        <ImagePlaceholder source={{ uri: data[2 * index + 1].pic56x56Url }} style={{ width: 25, height: 25 }} />
        <Text style={styles.item}>{data[2 * index + 1].name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const Footer = (props) => {
  const { data } = props
  const { hotDj = [] } = data
  const { moreDjList = [] } = data
  let hotDjChildren = []
  let moreDjChildren = []
  for (let i = 0; hotDj.length > 0 && i < hotDj.length / 2; i++) {
    hotDjChildren.push(
      <FootItem data={hotDj} index={i} key={i} />
    )
  }
  for (let i = 0; moreDjList.length > 0 && i < moreDjList.length / 2; i++) {
    moreDjChildren.push(
      <FootItem data={moreDjList} index={i} key={i} />
    )
  }
  return (
    <View style={{ backgroundColor: '#f2f4f5' }}>
      <View style={{ }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { marginLeft: 8 }]}>热门分类</Text>
        </View>
        <View style={{ borderColor: '#ddd', borderTopWidth: 0.6 }}>
          {hotDjChildren}
        </View>
      </View>
      <View style={{ marginTop: 18 }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { marginLeft: 8 }]}>更多分类</Text>
        </View>
        <View style={{ borderColor: '#ddd', borderTopWidth: 0.6 }}>
          {moreDjChildren}
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

export default DjCateList

const styles = StyleSheet.create({
  titleContainer: {
    height: 41,
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    color: '#333'
  },
  name: {
    color: '#333',
    marginHorizontal: 4,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 14
  },
  footerContainer: {
    flexDirection: 'row',
    width,
    height: 41,
    borderColor: '#ddd',
    alignItems: 'center',
    borderBottomWidth: 0.6
  },
  footItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 38
  },
  item: {
    marginLeft: 14,
    color: '#333',
    fontSize: 14
  },
  userCenterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    flexDirection: 'row'
  },
  line: {
    width: 0.6,
    height: 20,
    backgroundColor: '#ddd'
  }
})
