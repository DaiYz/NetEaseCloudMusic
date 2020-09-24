import React, { Component } from 'react'
import { View, ImageBackground, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { PersonalModel } from './model'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import Carousel from 'react-native-snap-carousel'
import ImagePlaceholder from '../../components/imagePlaceholder'
import HomeList from '../../components/homeList'
const { width } = Dimensions.get('window')
const ImagePadding = 8
const listPaddingHorizontal = 16
const ImageColumn = 3
const ImageWidthAndHeight = (width - listPaddingHorizontal - ImagePadding) / ImageColumn
@inject('account', 'app')
@observer
class Personalized extends Component {
  PersonalModel = new PersonalModel()
  constructor (props) {
    super(props)
    this.state = {
      activeImageIndex: 0
    }
  }

  async componentDidMount () {
  }

  _renderVipItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1} >
        <ImagePlaceholder source={{ uri: item.imageUrl }} style={{ height: 320 / (864 / (width - 60)), width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} resizeMode={'contain'} />
        <View style={{ backgroundColor: '#fff', height: 41, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', paddingHorizontal: 8 }}>
          <Text numberOfLines={1} style={{ color: '#333', fontSize: 14, fontWeight: '500' }}>{item.typeTitle}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _saveImageIndex = (index) => {
    this.setState({ activeImageIndex: index })
  }

  render () {
    const { app } = this.props
    const { banners = [] } = app
    return (
      <HomeList
        bannersData={banners}
        loading={banners.length === 0}
        renderTopIcon={() => <TopIcon buttons={this.PersonalModel.buttons.slice()} />}
        flatListProps={
          {
            data: this.PersonalModel.formattedList,
            renderItem: (data) => {
              const { item } = data
              const { type } = item
              switch (type) {
                case 'vip' :
                  return <UserCenter
                    data={data}
                    saveIndex={this._saveImageIndex}
                    activeImageIndex={this.state.activeImageIndex}
                    banners={banners.slice()}
                    renderItem={this._renderVipItem}
                  />
                default :
                  return <PersonalizedItem data={data} />
              }
            }
          }
        }
      />
    )
  }
}

export default Personalized

const TopIcon = (props) => {
  const { buttons } = props
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#f2f4f5', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
      {
        buttons.map((item, index) => (
          <TouchableOpacity key={index} style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => item.onPress()}>
            {
              index === 1
                ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <ImagePlaceholder source={item.icon} style={{ width: 45, height: 45 }} />
                  <Text style={{ position: 'absolute', fontSize: 11, color: '#fff' }}>{moment().format('DD')}</Text>
                </View>
                : <ImagePlaceholder source={item.icon} style={{ width: 45, height: 45 }} />
            }
            <Text style={{ color: '#333', fontSize: 12, marginTop: 8 }}>{item.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const PersonalizedItem = (props) => {
  const { data } = props
  const { item, index } = data
  return (
    <View style={{ paddingHorizontal: 8, backgroundColor: '#f2f4f5' }}>
      {
        item.title
          ? <View style={{ flexDirection: 'row', height: 41, alignItems: 'center', marginTop: 8 }}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <SimpleLine name={'arrow-right'} size={14} color={'#333'} />
          </View> : null
      }
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          item.data.length > 0
            ? item.data.map((val, i) =>
              <View key={i}
                style={[{ marginHorizontal: (i % 3 === 1) ? ImagePadding / 2 : 0 }, styles.coverContainer]}>
                <ImagePlaceholder
                  source={{ uri: item.type === 'music' ? val.song.album.picUrl : val.picUrl }}
                  borderRadius={3}
                  style={styles.cover} />
                <Text numberOfLines={item.type === 'music' ? 1 : 2} style={styles.name}>{val.name}</Text>
                {item.type === 'music' ? <Text numberOfLines={1} style={[styles.name, { color: '#666', marginTop: 6 }]}>{val.song.artists[0].name}</Text> : null}
                {
                  item.type === 'list'
                    ? <View style={{ flexDirection: 'row', position: 'absolute', top: 4, right: 4, alignItems: 'center' }}>
                      <SvgIcon path={iconPath.headset} size={10} fill={['#fff']} />
                      <Text style={{ fontSize: 10, color: '#fff', marginLeft: 2 }}>{`${parseInt(val.playCount) >= 100000 ? parseInt(val.playCount / 10000) + '万' : parseInt(val.playCount)}`}</Text>
                    </View>
                    : null
                }

              </View>
            )
            : null
        }
      </View>
    </View>
  )
}

const UserCenter = (props) => {
  const { banners, renderItem, data, saveIndex, activeImageIndex } = props
  const { item } = data
  const { title } = item
  return (
    <View style={{ marginTop: 16 }}>
      <ImageBackground
        blurRadius={18}
        source={{ uri: banners[activeImageIndex].imageUrl }}
        style={{ flex: 1 }}
      >
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 14 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>{title}</Text>
        </View>
        <Carousel
          ref={(c) => { this._carousel = c }}
          loop
          data={banners}
          onSnapToItem={(index) => saveIndex(index)}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width - 60}
        />
        <View style={{ alignItems: 'center', marginVertical: 14 }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.userCenterButton}>
            <Text style={{ fontSize: 12, color: '#fff' }}>进入会员中心</Text>
            <SimpleLine name={'arrow-right'} size={12} color={'#ddd'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    width,
    height: 110,
    backgroundColor: '#ce3d3a',
    position: 'absolute'
  },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingVertical: 5,
    borderTopLeftRadius: 4,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 17,
    color: '#333',
    marginRight: 4,
    fontWeight: '700'
  },
  coverContainer: {
    width: ImageWidthAndHeight,
    paddingBottom: 18
  },
  cover: {
    width: '100%',
    height: ImageWidthAndHeight
  },
  name: {
    color: '#333',
    fontSize: 12,
    marginTop: 8,
    lineHeight: 14
  },
  userCenterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    flexDirection: 'row'
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
  }
})
