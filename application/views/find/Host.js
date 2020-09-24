import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { inject, observer } from 'mobx-react'
import ImagePlaceholder from '../../components/imagePlaceholder'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import HomeList from '../../components/homeList'
import { DjModel } from './model'
<<<<<<< HEAD
import { NavigationActions } from 'react-navigation'
import utils from '../../utils'
=======
import { navigate } from '../../utils/rootNavigation'
>>>>>>> develop
const { width } = Dimensions.get('window')
const ImagePadding = 8
const listPaddingHorizontal = 16
const ImageColumn = 3
const ImageWidthAndHeight = (width - listPaddingHorizontal - ImagePadding) / ImageColumn
@inject('account', 'app')
@observer
class Host extends Component {
  DjModel = new DjModel()
  async componentDidMount () {
    await this.DjModel.getDjCateList()
  }

  onButtonPress = () => {
<<<<<<< HEAD
    utils.global.navigator.dispatch(NavigationActions.navigate(
      {
        routeName: 'PayQuality'
      }
    ))
=======
    navigate('PayQuality')
>>>>>>> develop
  }

  render () {
    const { app } = this.props
    const { banners = [] } = app
    return (
      <HomeList
        bannersData={banners}
        renderTopIcon={() => <TopIcon buttons={this.DjModel.buttons.slice()} />}
        flatListProps={
          {
            data: this.DjModel.formattedList,
            renderItem: (data) => {
              const { item } = data
              const { type } = item
              switch (type) {
                case 'sup':
                  return null
                case 'high':
                  return <HighQuality data={data} onButtonPress={this.onButtonPress} />
                default :
                  return <Normal data={data} />
              }
            },
            ListFooterComponent: <Footer data={this.DjModel.djCateList} />
          }
        }
      />
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
<<<<<<< HEAD
  let hotDjChildren = []
  let moreDjChildren = []
=======
  const hotDjChildren = []
  const moreDjChildren = []
>>>>>>> develop
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
        <View style={{ height: 41, justifyContent: 'center', marginTop: 8 }}>
          <Text style={[styles.title, { marginLeft: 8 }]}>热门分类</Text>
        </View>
        <View style={{ borderColor: '#ddd', borderTopWidth: 0.6 }}>
          {hotDjChildren}
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <View style={{ height: 41, justifyContent: 'center', marginTop: 8 }}>
          <Text style={[styles.title, { marginLeft: 8 }]}>更多分类</Text>
        </View>
        <View style={{ borderColor: '#ddd', borderTopWidth: 0.6 }}>
          {moreDjChildren}
        </View>
      </View>
    </View>
  )
}

const Normal = (props) => {
  const { data } = props
  const { item } = data
  const { type } = item
  return (
    <View style={{ paddingHorizontal: 8, backgroundColor: '#f2f4f5' }}>
      {
        item.title
          ? <View style={{ flexDirection: 'row', height: 41, alignItems: 'center', marginTop: 8 }}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
<<<<<<< HEAD
            <SimpleLine name={'arrow-right'} size={14} color={'#333'} />
=======
            <SimpleLine name='arrow-right' size={14} color='#333' />
>>>>>>> develop
          </View> : null
      }
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          item.data.length > 0
            ? item.data.map((val, i) =>
<<<<<<< HEAD
              <View key={i}
                style={[{ marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0 }, styles.coverContainer]}>
=======
              <View
                key={i}
                style={[{ marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0 }, styles.coverContainer]}
              >
>>>>>>> develop
                <View>
                  <ImagePlaceholder
                    source={{ uri: val.picUrl }}
                    borderRadius={3}
<<<<<<< HEAD
                    style={styles.cover} />
                  <Text numberOfLines={1} style={[styles.name, { position: 'absolute',
                    bottom: 6,
                    left: 2,
                    color: '#fff'
                  }]}>{val.name}</Text>
=======
                    style={styles.cover}
                  />
                  <Text
                    numberOfLines={1} style={[styles.name, {
                      position: 'absolute',
                      bottom: 6,
                      left: 2,
                      color: '#fff'
                    }]}
                  >{val.name}
                  </Text>
>>>>>>> develop
                </View>
                <Text numberOfLines={2} style={[styles.name, { marginTop: 6 }]}>{type === 'recommended' ? val.rcmdtext : val.desc}</Text>
              </View>
            )
            : null
        }
      </View>
    </View>
  )
}

const HighQuality = (props) => {
  const { data, onButtonPress } = props
  const { item } = data
  const { title } = item
  return (
    <View style={{ marginTop: 16 }}>
      <ImageBackground
        blurRadius={18}
        source={{ uri: item.data[0].picUrl }}
        style={{ flex: 1, paddingHorizontal: 8 }}
      >
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 14 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>{title}</Text>
          <Text style={{ fontSize: 12, color: '#bbb', marginTop: 10 }}>你值得拥有的优质内容</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            item.data.length > 0
              ? item.data.map((val, i) =>
<<<<<<< HEAD
                <View key={i}
                  style={[{ marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0 }, styles.coverContainer]}>
                  <View>
                    <ImagePlaceholder
                      source={{ uri: val.picUrl }}
                      style={[styles.cover, { borderTopRightRadius: 3, borderTopLeftRadius: 3 }]} />
                    <Text numberOfLines={1} style={[styles.name, { position: 'absolute',
                      bottom: 4,
                      left: 4,
                      color: '#fff'
                    }]}>{val.name}</Text>
=======
                <View
                  key={i}
                  style={[{ marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0 }, styles.coverContainer]}
                >
                  <View>
                    <ImagePlaceholder
                      source={{ uri: val.picUrl }}
                      style={[styles.cover, { borderTopRightRadius: 3, borderTopLeftRadius: 3 }]}
                    />
                    <Text
                      numberOfLines={1} style={[styles.name, {
                        position: 'absolute',
                        bottom: 4,
                        left: 4,
                        color: '#fff'
                      }]}
                    >{val.name}
                    </Text>
>>>>>>> develop
                  </View>
                  <View style={{ backgroundColor: '#fff', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
                    <Text numberOfLines={2} style={[styles.name, { marginTop: 6 }]}>{val.rcmdText}</Text>
                    <Text style={styles.price}>¥{(val.originalPrice / 100)}</Text>
                  </View>
                </View>
              )
              : null
          }
        </View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.userCenterButton} onPress={() => onButtonPress()}>
            <Text style={{ fontSize: 12, color: '#fff' }}>全部精品电台</Text>
<<<<<<< HEAD
            <SimpleLine name={'arrow-right'} size={12} color={'#ddd'} />
=======
            <SimpleLine name='arrow-right' size={12} color='#ddd' />
>>>>>>> develop
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const TopIcon = (props) => {
  const { buttons } = props
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#f2f4f5', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
      {
        buttons.map((item, index) => (
          <TouchableOpacity key={index} style={{ justifyContent: 'center', alignItems: 'center' }} onPress={item.onPress}>
            <View style={{ backgroundColor: '#ce3d3a', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }}>
              {item.icon}
            </View>
            <Text style={{ color: '#333', fontSize: 12, marginTop: 8 }}>{item.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default Host

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: '#333',
    marginRight: 4,
    fontWeight: '700'
  },
  coverContainer: {
    width: ImageWidthAndHeight
  },
  cover: {
    width: '100%',
    height: ImageWidthAndHeight
  },
  name: {
    color: '#333',
    marginHorizontal: 4,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 14
  },
  price: {
    color: '#ce3d3a',
    marginHorizontal: 4,
    fontSize: 12,
    marginBottom: 8,
    marginTop: 4,
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
