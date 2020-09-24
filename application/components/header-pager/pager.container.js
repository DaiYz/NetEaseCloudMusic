import React, { Component, createElement, cloneElement } from 'react'
import { View, Platform, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native'
import AndroidViewPagerContainer from './pager.android'
import LinearGradient from 'react-native-linear-gradient'
const { width } = Dimensions.get('window')
const ViewPagerAndroid = require('@react-native-community/viewpager')
class PagerContainerComponent extends Component {
  static defaultProps = {
    scrollEnabled: true
  }

  componentWillReceiveProps (next, props) {
    if (next.index !== props.index) {
      this.PagerView.scrollTo && this.PagerView.scrollTo({ x: next.index * width, y: 0, aniamted: true })
      this.PagerView.setPage && this.PagerView.setPage(next.index)
    }
  }

  render () {
    const { scrollEnabled, initialPage = 0 } = this.props
    const pagerProps = {}
    pagerProps.style = { flex: 1 }
    pagerProps.initialPage = initialPage
    pagerProps.showsHorizontalScrollIndicator = false
    pagerProps.pagingEnabled = true
    pagerProps.horizontal = true
    pagerProps.onScroll = ({ nativeEvent }) => { this.props.onScroll && this.props.onScroll(nativeEvent) }
    pagerProps.scrollEnabled = scrollEnabled
    pagerProps.scrollEventThrottle = width / 10
    pagerProps.onMomentumScrollEnd = ({ nativeEvent }) => { this.props.onChangeIndex && this.props.onChangeIndex(parseInt(nativeEvent.contentOffset.x / width)) }
    pagerProps.onPageSelected = ({ nativeEvent }) => { this.props.onChangeIndex && this.props.onChangeIndex(parseInt(nativeEvent.position)) }

    const childElement = this.props.children.map((pipe, key) => {
      const extraProps = {}
      extraProps.key = key
      extraProps.style = { flex: 1, width }
      return createElement(View, extraProps, pipe)
    })
    // const childElement = []

    return Platform.select({
      android: (
        <AndroidViewPagerContainer style={{ flex: 1, width }}>
          <ViewPagerAndroid {...pagerProps} ref={e => { this.PagerView = e }} children={childElement} />
        </AndroidViewPagerContainer>
      ),
      ios: (
        <View style={{ flex: 1, width }}>
          <ScrollView {...pagerProps} ref={e => { this.PagerView = e }} children={childElement} />
        </View>
      )
    })
  }
}

export default PagerContainerComponent
