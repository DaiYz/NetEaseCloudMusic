import React, { Component, createElement } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native'

class PagerHeaderComponent extends Component {
  constructor (props) {
    super(props)
    console.log(props.BlockMargin)
    this.BLOCK_MARGIN = props.BlockMargin
    /* 映射 */
    this.charMap = this.props.source.map(pipe => (pipe.title || '').length * props.chatWidth)
    /* 动画 */
    let nextPosition = 0
    for (let i = 0; i < props.index; i++) {
      nextPosition += (this.charMap[i] + this.BLOCK_MARGIN * 2)
    }
    const animateValue = {}
    animateValue.horizontal = new Animated.Value(nextPosition)
    this.animateValue = animateValue
    this.state = {
      tabWidth: 0,
      end: false
    }
  }
  static defaultProps = {
    container: 'scrollView',
    BlockMargin: 6,
    activeColor: '#000',
    inactiveColor: '#999'
  }

  componentWillReceiveProps (next, props) {
    if (next.index !== props.index) {
      let nextPosition = 0
      for (let i = 0; i < next.index; i++) {
        nextPosition += (this.charMap[i] + this.BLOCK_MARGIN * 2)
      }
      Animated.timing(this.animateValue.horizontal, { duration: 200, toValue: nextPosition }).start()
    }
    if (next.index >= 3 && next.source.length === 6) {
      this.pageHeader && this.pageHeader.scrollToEnd && this.pageHeader.scrollToEnd(true)
      this.setState({end: true})
    } else {
      this.pageHeader && this.pageHeader.scrollTo && this.pageHeader.scrollTo({x: 0, y: 0, animated: true})
    }
  }

  onScroll = (e) => {
    console.log(e)
  }

  render () {
    const extraProps = { ...this.props, style: [{ flex: 1, height: 34 }, { ...this.props.style }] }
    const {container} = this.props
    delete extraProps.source

    const innerExtraProps = {}
    innerExtraProps.horizontal = true
    innerExtraProps.showsHorizontalScrollIndicator = false
    innerExtraProps.ref = (e) => this.pageHeader = e
    innerExtraProps.style = container === 'view' ? { flex: 1, flexDirection: 'row', alignItems: 'center' } : {flex: 1}
    innerExtraProps.contentContainerStyle = { justifyContent: 'center' }
    if (this.props.source && this.props.source.length > 0) {
      const subElement = this.props.source
        .filter(pipe => pipe.visible)
        .map((pipe, index) => {
          const selected = index === this.props.index
          return (
            <TouchableOpacity
              key={pipe.key}
              onPress={() => {
                if (pipe.selected) return
                this.props.onChangeIndex && this.props.onChangeIndex(index, pipe)
              }}
              activeOpacity={1}
              style={[
                { flex: 1, alignItems: 'center' },
                container === 'view'
                  ? {}
                  : {width: (pipe.title || '').length * this.props.chatWidth, marginHorizontal: this.BLOCK_MARGIN}
              ]}
              onLayout={(e) => this.setState({tabWidth: e.nativeEvent.layout.width})}
            >
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: pipe.selected ? '#696969' : selected ? extraProps.activeColor : extraProps.inactiveColor, fontWeight: pipe.selected ? '400' : selected ? '800' : '400', fontSize: 15 }}>{ pipe.title }</Text>
              </View>
            </TouchableOpacity>
          )
        })
      innerExtraProps.children = subElement
    }

    if (this.props.source) {
      const element = (
        <Animated.View key={'animate'} style={{ width: this.props.chatWidth === 0 ? this.BLOCK_MARGIN * 2 : this.charMap[this.props.index], marginHorizontal: this.props.chatWidth === 0 ? 0 : this.BLOCK_MARGIN, alignItems: 'center', position: 'absolute', bottom: 0, left: this.animateValue.horizontal }}>
          {this.props.bottomIcon ? this.props.bottomIcon
            : <View style={{ height: 2.5, width: 15, borderRadius: 2, backgroundColor: extraProps.bottomColor || '#5c8ae3' }} /> }
        </Animated.View>
      )
      innerExtraProps.children.push(element)
    }
    const Component = container === 'view' ? View : ScrollView
    const InnnerView = createElement(Component, innerExtraProps)
    return createElement(View, extraProps, InnnerView)
  }
}

export default PagerHeaderComponent
