import React from 'react'
import { View, Text, StyleSheet, LayoutAnimation, Platform, Dimensions, TouchableOpacity, Animated, TextInput, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import utils from '../../utils'
import SvgIcon from 'react-native-svg-iconfont'
import WaveLoading from '../wave'
import * as iconPath from '../../source/svg'
const { width } = Dimensions.get('window')
class SearchHeader extends React.Component {
  constructor (props) {
    super(props)
    this.isIPhoneX = utils.Tools.isIPhoneX()
    this.IPhoneXPaddingTop = 24
    this.iosStatusBarHeight = 20
    this.Header = 44
    this.HeaderPaddingTop = this.isIPhoneX ? (this.IPhoneXPaddingTop + this.iosStatusBarHeight) : Platform.OS === 'ios' ? this.iosStatusBarHeight : 0
    this.HeaderButtonAnimate = new Animated.Value(0)
    this.state = {
      show: true,
      headerLeftShow: true,
      align: 'center'
    }
  }

  showCancel = () => {
    const { onSearchPress } = this.props
    this._clickStartAnimation(() => {
      this.setState({ show: false, headerLeftShow: false, align: 'flex-start' })
      onSearchPress()
    })
    Animated.timing(this.HeaderButtonAnimate, { duration: 200, toValue: 1 }).start(
      () => this.input && this.input.focus()
    )
  }

  hideCancel = () => {
    Keyboard.dismiss()
    this.input && this.input.clear()
    this._clickStartAnimation(() => {
      this.setState({ headerLeftShow: true, align: 'center' })
      this.props.onCancelPress()
    })
    Animated.timing(this.HeaderButtonAnimate, { duration: 200, toValue: 0 }).start(
      () => {
        setTimeout(() => this.setState({ show: true }), 200)
      }
    )
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

  onPress = () => {
    const { onSearchPress } = this.props
    this.showCancel()
  }

  render () {
    const { show, headerLeftShow } = this.state
    const { placeholder, headerRightIcon, headerLeftIcon } = this.props
    return (
      <View style={{
        paddingTop: this.HeaderPaddingTop,
        backgroundColor: '#ce3d3a'
      }}>
        <View style={{
          width,
          height: this.Header,
          flexDirection: 'row'
        }}>
          {
            headerLeftShow
              ? <HeaderLeft show={show} headerLeftIcon={headerLeftIcon} HeaderButtonAnimate={this.HeaderButtonAnimate} />
              : null
          }
          <TouchableOpacity
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255, 0.3)',
              alignItems: this.state.align,
              flex: 1,
              height: 30,
              alignSelf: 'center',
              borderRadius: 20,
              marginHorizontal: 10
            }}
            onPress={this.onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SvgIcon path={iconPath.search} size={14} fill={['#ffffff80']} style={{ marginHorizontal: 8 }} />
              {
                headerLeftShow
                  ? <Text style={{ color: '#ffffff90', fontSize: 13 }}>{placeholder}</Text>
                  : <TextInput
                    ref={e => (this.input = e)}
                    clearButtonMode={'while-editing'}
                    placeholder={placeholder}
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
          <HeaderRight headerRightIcon={headerRightIcon} isPlaying={this.props.isPlaying} show={show} HeaderButtonAnimate={this.HeaderButtonAnimate} hideCancel={this.hideCancel} />
          <HeaderRightHide HeaderButtonAnimate={this.HeaderButtonAnimate} hideCancel={this.hideCancel} />
        </View>
      </View>
    )
  }
}

const HeaderLeft = (props) => {
  const { show, headerLeftIcon, HeaderButtonAnimate } = props
  return (
    <Animated.View style={[
      styles.headerButtonContainer,
      {
        opacity: HeaderButtonAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }
    ]}>
      {show
        ? <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerLeft}
          onPress={() => {}
          }
        >
          {headerLeftIcon}
        </TouchableOpacity> : null}
    </Animated.View>
  )
}

const HeaderRight = (props) => {
  return (
    <Animated.View style={[
      styles.headerButtonContainer,
      {
        opacity: props.HeaderButtonAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }
    ]}>
      { props.show
        ? <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerRight}
          onPress={() => { }
          }
        >
          {props.isPlaying ? <WaveLoading lineColor={'#fff'} /> : props.headerRightIcon}
        </TouchableOpacity>
        : null}
    </Animated.View>
  )
}

const HeaderRightHide = (props) => {
  return (
    <Animated.View style={[styles.headerHide, {
      opacity: props.HeaderButtonAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [{
        translateX: props.HeaderButtonAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -52]
        })
      }]
    }]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.headerRight}
        onPress={() => props.hideCancel()
        }
      >
        <Text style={{ fontSize: utils.Tools.FontSize(14), color: '#fff' }}>取消</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default SearchHeader

SearchHeader.propTypes = {
  headerLeftIcon: PropTypes.element,
  headerRightIcon: PropTypes.element,
  searchIcon: PropTypes.element,
  placeholder: PropTypes.string,
  onSearchPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  isPlaying: PropTypes.bool
}
SearchHeader.defaultProps = {
  placeholder: '猜你喜欢 また君と(再度和你)',
  headerRightIcon: <SvgIcon path={iconPath.voice} size={24} fill={['#fff']} />,
  searchIcon: <SvgIcon path={iconPath.search} size={14} fill={['#ffffff80']} style={{ marginHorizontal: 8 }} />,
  headerLeftIcon: <SvgIcon path={iconPath.identify} size={28} fill={['#fff']} />,
  onSearchPress: () => {},
  onCancelPress: () => {},
  isPlaying: false
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    justifyContent: 'center',
    width: 54
  },
  headerLeft: {
    top: 1,
    width: 54,
    paddingLeft: 18,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  headerRight: {
    top: 1,
    width: 54,
    paddingRight: 18,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headerHide: {
    justifyContent: 'center',
    position: 'absolute',
    top: 12,
    left: width
  }
})
