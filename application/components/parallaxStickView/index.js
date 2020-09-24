import React from 'react'
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  ViewPropTypes as RNViewPropTypes, LayoutAnimation
} from 'react-native'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import PropTypes from 'prop-types'
import SvgIcon from 'react-native-svg-iconfont'
import utils from '../../utils'
import * as iconPath from '../../source/svg'
const { width } = Dimensions.get('window')
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)
const IsIPhoneX = utils.Tools.isIPhoneX()
const IPhoneXPaddingTop = 24
const IPhoneXPaddingBottom = IsIPhoneX ? 24 : 0
const iosStatusBarHeight = 20
const Header = 44
const HeaderPaddingTop = IsIPhoneX ? (IPhoneXPaddingTop + iosStatusBarHeight) : Platform.OS === 'ios' ? iosStatusBarHeight : 0
const NavHeaderHeight = HeaderPaddingTop + Header
class ParallaxStickListView extends React.Component {
  constructor (props) {
    super(props)
    this.scrollY = new Animated.Value(0)
    this.listHeaderHeight = 0
    this.state = {
      show: false,
      headerLeftShow: true,
      showTitle: false,
      listHeaderHeight: 0,
      title: props.headerDefaultTitle
    }
  }

  static propTypes = {
    listContainerStyle: RNViewPropTypes.style,
    sections: PropTypes.array.isRequired,
    ListHeader: PropTypes.element,
    ListFooter: PropTypes.element,
    renderItem: PropTypes.func.isRequired,
    renderStickHeader: PropTypes.func,
    renderLoading: PropTypes.func,
    scrollImageHeight: PropTypes.number,
    blurRadius: PropTypes.number,
    headerTitle: PropTypes.string,
    headerDefaultTitle: PropTypes.string,
    backgroundImage: Image.propTypes.source,
    leftPress: PropTypes.func,
    renderExtraHeader: PropTypes.func,
    headerRight: PropTypes.element
  }

  static defaultProps = {
    sections: [],
    listContainerStyle: {},
    renderItem: () => {},
    renderStickHeader: () => {},
    scrollImageHeight: 400,
    backgroundImage: { uri: 'http://img1.ph.126.net/SSvFbcJzwGBlqy4xon6FjA==/6608832342050415367.jpg' },
    headerDefaultTitle: '排行榜',
    renderAlwaysCenter: () => null,
    renderExtraHeader: () => null,
    headerRight: null,
    blurRadius: 10
  }

  componentDidMount () {
    this.scrollY.addListener(({ value }) => {
      if (value <= -20 && !this.state.show) {
        this._clickStartAnimation(this.setState({ show: true }))
      }
      if (value >= 50 && this.state.show) {
        this._clickStartAnimation(this.setState({ show: false }))
      }
      if (this.props.headerTitle !== undefined) {
        if (value >= 100 && !this.state.showTitle) {
          this._clickStartAnimation(this.setState({ showTitle: true, title: this.props.headerTitle }))
        }
        if (value < 100 && this.state.showTitle) {
          this._clickStartAnimation(this.setState({ showTitle: false, title: this.props.headerDefaultTitle }))
        }
      }
    })
  }

  _clickStartAnimation (callback) {
    LayoutAnimation.configureNext({
      duration: 200, // 持续时间
      create: {
        type: LayoutAnimation.Types.linear,
        property: 'opacity'
      },
      useNativeDriver: false,
      update: {
        type: 'linear'
      } }, () => {})
    callback && callback()
  }

  componentWillUnmount () {
    this.scrollY.removeAllListeners()
  }

  _renderHeaderParallaxImage = () => {
    const { scrollY } = this
    const {
      scrollImageHeight,
      backgroundImage,
      blurRadius
    } = this.props
    return (
      <View style={{ position: 'absolute',
        height: scrollImageHeight,
        width,
        justifyContent: 'center',
        alignItems: 'center' }}>
        <Animated.Image
          blurRadius={blurRadius}
          style={[styles.background, {
            height: scrollImageHeight,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-scrollImageHeight, 0, scrollImageHeight],
                outputRange: [scrollImageHeight / 2, 0, -(scrollImageHeight - NavHeaderHeight - 20)],
                extrapolate: 'clamp'
              })
            }, {
              scale: scrollY.interpolate({
                inputRange: [-scrollImageHeight, 0, scrollImageHeight],
                outputRange: [2, 1, 1]
              })
            }]
          }]}
          source={backgroundImage} />
      </View>
    )
  }

  render () {
    const { renderItem, sections, renderStickHeader, leftPress, listContainerStyle } = this.props
    const { show, headerLeftShow, title } = this.state
    return (
      <View style={{ flex: 1 }}>
        {this._renderHeaderParallaxImage()}
        <NavHeader title={title} leftPress={leftPress} />
        <View style={{ flex: 1, borderTopRightRadius: 8, borderTopLeftRadius: 8, overflow: 'hidden' }}>
          <Animated.View style={[{ width }, {
            position: 'absolute',
            width: '100%',
            top: this.scrollY.interpolate({
              inputRange: [-30, 0, 30],
              outputRange: [30, show ? 0 : -30, -30],
              extrapolateRight: 'clamp'
            })

          }]}>
            <Animated.View style={{ width: '100%',
              height: 30,
              paddingHorizontal: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255, 0.3)',
                  alignItems: this.state.align,
                  height: 30,
                  width: '100%',
                  alignSelf: 'center',
                  borderRadius: 20,
                  marginHorizontal: 10
                }}
                onPress={this.onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                  <SvgIcon path={iconPath.search} size={14} fill={['#ffffff90']} style={{ marginHorizontal: 8 }} />
                  {
                    headerLeftShow
                      ? <Text style={{ color: '#ffffff90', fontSize: 13 }}>{'搜索歌单内歌曲'}</Text>
                      : <TextInput
                        ref={e => (this.input = e)}
                        clearButtonMode={'while-editing'}
                        placeholder={'搜索歌单内歌曲'}
                        placeholderTextColor={'#ffffff90'}
                        selectionColor={'#ce3d3a'}
                        style={{
                          padding: 0,
                          fontSize: 13,
                          alignSelf: 'center',
                          color: '#fff',
                          flex: 1
                        }}
                        underlineColorAndroid={'transparent'}
                      />
                  }
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[
            { listContainerStyle },
            { flex: 1, overflow: 'hidden', paddingBottom: IPhoneXPaddingBottom },
            { top: this.scrollY.interpolate({
              inputRange: [-30, 0, 30],
              outputRange: [30, show ? 30 : 0, 0],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            }) }
          ]}>
            <AnimatedSectionList
              ref={(e) => this.FlatList = e}
              overScrollMode={'always'}
              stickySectionHeadersEnabled
              ListFooterComponent={this.props.ListFooter ? this.props.ListFooter : null}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: false })}
              ListHeaderComponent={<View style={{ width, backgroundColor: 'transparent', overflow: 'hidden' }}
                onLayout={(e) => this.setState({ listHeaderHeight: e.nativeEvent.layout.height + 41 })}>
                {this.props.ListHeader ? this.props.ListHeader : null}
              </View>}
              _mustAddThis={this.scrollY}
              renderSectionHeader={(obj) => renderStickHeader(obj)}
              sections={sections}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => renderItem({ item, index })}
            />
          </Animated.View>
        </View>

      </View>
    )
  }
}

export default ParallaxStickListView

const NavHeader = (props) => {
  return <Animated.View style={{
    paddingTop: HeaderPaddingTop
  }}>
    <View style={{
      width,
      height: Header,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }} >
      <HeaderLeft leftPress={props.leftPress} />
      <HeaderCenter title={props.title} />
    </View>
  </Animated.View>
}

const HeaderLeft = (props) => {
  const { leftPress = () => {} } = props
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => leftPress()}
      style={
        {
          position: 'absolute',
          left: 12
        }
      }
    >
      <SimpleLine
        name={'arrow-left'}
        size={23}
        color={'#fff'}
      />
    </TouchableOpacity>
  )
}

const HeaderCenter = (props) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#2e2f31',
    width,
    resizeMode: 'cover'
  }
})
