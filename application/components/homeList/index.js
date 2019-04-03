import React, { Component } from 'react'
import { View, Dimensions, Animated, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import ImagePlaceholder from '../imagePlaceholder'
import WaveLoading from '../wave'
const { width } = Dimensions.get('window')

class HomeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeSlide: 0,
      activeImageIndex: 0
    }
    this.listHeaderAnimate = new Animated.Value(0)
  }

  _renderItem = ({ item, index }) => {
    const { renderBannerItem } = this.props
    if (renderBannerItem !== undefined) {
      return renderBannerItem({ item, index })
    }
    return (
      <TouchableOpacity activeOpacity={1} style={{ borderRadius: 4, overflow: 'hidden', marginHorizontal: 8 }}>
        <ImagePlaceholder borderRadius={5} source={{ uri: item.imageUrl }} style={{ height: 320 / (864 / (width - 16)), width: '100%' }} resizeMode={'contain'} />
        <BannerLabel label={item.typeTitle} color={item.titleColor} />
      </TouchableOpacity>
    )
  }

  _saveIndex = (index) => {
    this.setState({ activeSlide: index })
  }

  render () {
    const { bannersData = [], flatListProps, renderTopIcon = () => {}, loading } = this.props
    const { data = [], renderItem = () => {} } = flatListProps
    return (
      !loading
        ? <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <Animated.View style={[styles.background, {
            transform: [{
              scaleY: this.listHeaderAnimate.interpolate({
                inputRange: [-110, 0, 110],
                outputRange: [3, 1, 1]
              })
            }]
          }]} />
          <FlatList
            ref={e => (this.list = e)}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.listHeaderAnimate } } }])}
            ListHeaderComponent={
              <View style={{ borderColor: '#ddd', borderBottomWidth: StyleSheet.hairlineWidth, backgroundColor: '#f2f4f5' }}>
                <Animated.View style={[styles.background, {
                  transform: [{
                    translateY: this.listHeaderAnimate.interpolate({
                      inputRange: [-110, 0, 110],
                      outputRange: [0, 0, -110]
                    })
                  }]
                }]} />
                <Banner
                  banners={bannersData.slice()}
                  activeSlide={this.state.activeSlide}
                  saveIndex={this._saveIndex}
                  renderItem={this._renderItem}
                />
                {renderTopIcon()}
              </View>
            }
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={(data) => renderItem(data)}
            {...flatListProps}
          />
        </View>
        : <View style={{ flex: 1, backgroundColor: '#f2f4f5' }}>
          <Loading style={{ marginTop: 100 }} />
        </View>
    )
  }
}

export default HomeList

const Loading = (props) => {
  const { style } = props
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <WaveLoading baseHeight={[4, 16, 2, 10]} targetHeight={[10, 4, 16, 2]} lineColor={'#ce3d3a'} lineStyle={{ marginRight: 2, width: 1 }} />
      <Text style={{ fontSize: 13, color: '#888', marginTop: 8 }}>正在加载...</Text>
    </View>
  )
}

const Banner = (props) => {
  const { saveIndex, banners, activeSlide, renderItem } = props
  return (
    <View style={{ marginTop: 6 }}>
      <Carousel
        ref={(c) => { this._carousel = c }}
        autoplay
        loop
        data={banners}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => saveIndex(index)}
      />
      <View style={{ position: 'absolute', bottom: 5, width }} >
        <Pagination
          dotsLength={banners.length}
          activeDotIndex={activeSlide}
          containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
          dotContainerStyle={{ marginHorizontal: 0 }}
          dotStyle={styles.dotStyle}
          inactiveDotColor={'rgba(255, 255, 255, 0.92)'}
          dotColor={'#ce3d3a'}
          inactiveDotScale={1}
        />
      </View>
    </View>
  )
}

const BannerLabel = (props) => {
  const { label, color } = props
  const backgroundColor = color === 'red' ? '#ce3d3a' : '#9EC5E5'
  return (
    <View style={[styles.label, { backgroundColor }]}>
      <Text style={{ color: '#fff', fontSize: 11 }}>{label}</Text>
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
