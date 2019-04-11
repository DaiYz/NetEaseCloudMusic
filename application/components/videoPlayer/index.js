import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  ActivityIndicator,
  Platform
} from 'react-native'
import Video from 'react-native-video'
import Slider from 'react-native-slider'
import utils from '../../utils'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import Orientation from 'react-native-orientation'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
const { width: WIDTH } = Dimensions.get('window')
const isIPhoneX = utils.Tools.isIPhoneX()
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const Header = 44
const HeaderPaddingTop = isIPhoneX ? (IPhoneXPaddingTop + iosStatusBarHeight) : Platform.OS === 'ios' ? iosStatusBarHeight : 0
const videoPaddingTop = isIPhoneX ? (IPhoneXPaddingTop + 8) : 0
const IPhoneXSafeArea = isIPhoneX ? 80 : 0

class VideoPlayerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.onHeaderLeftPress = this.onHeaderLeftPress.bind(this)
    this.onClickFullScreen = this.onClickFullScreen.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onBuffer = this.onBuffer.bind(this)
    this.onClickPause = this.onClickPause.bind(this)
    this.startTime = this.startTime.bind(this)
    this.onClickVideo = this.onClickVideo.bind(this)
    this.onSliderValChange = this.onSliderValChange.bind(this)
    this.onSlidingComplete = this.onSlidingComplete.bind(this)
    this.onGestureEvent = this.onGestureEvent.bind(this)
    this.onHandlerStateChange = this.onHandlerStateChange.bind(this)
    this.timer = null
    this.compareVal = 0
    this.state = {
      paddingTop: videoPaddingTop,
      paddingHorizontal: IPhoneXSafeArea,
      forward: false,
      backward: false,
      fullScreen: false,
      paused: false,
      isBuffering: false,
      currentTime: 0,
      width: WIDTH,
      loadStart: false,
      loadEnd: false,
      showControl: false,
      height: WIDTH / 16 * 9
    }
  }

  _clickStartAnimation = (callback, duration = 200) => {
    LayoutAnimation.configureNext({
      duration, // 持续时间
      create: {
        type: LayoutAnimation.Types.linear,
        property: 'opacity'
      },
      update: {
        type: 'linear'
      } }, () => {})
    callback && callback()
  }

  onLoad (e) {
    this._clickStartAnimation(
      this.setState({ loadStart: true })
    )
    if (this.state.loadEnd) {
      this.setState({ loadEnd: false })
    }
  }

  startTime () {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true, 'fade')
      }
      this._clickStartAnimation(() => this.setState({ showControl: false }), 300)
    }, 3500)
  }

  onProgress (data) {
    this.setState({ currentTime: data.currentTime })
  }

  onBuffer ({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering })
  }

  onHeaderLeftPress () {
    const { fullScreen } = this.state
    const { onNavLeftButtonPress } = this.props
    if (fullScreen) {
      Orientation.lockToPortrait()
      this.setState({ fullScreen: false })
    } else {
      return onNavLeftButtonPress()
    }
  }

  onClickFullScreen () {
    const { fullScreen } = this.state
    if (fullScreen) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscapeRight()
    }
    this.setState({ fullScreen: !fullScreen })
  }

  onClickPause () {
    this.setState({ paused: !this.state.paused })
  }

  onClickVideo () {
    if (!this.state.loadStart || this.state.loadEnd) return null
    if (this.state.showControl) {
      this._clickStartAnimation(() => this.setState({ showControl: false }), 300)
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true, 'fade')
      }
      this.timer && clearTimeout(this.timer)
    } else {
      this._clickStartAnimation(() => this.setState({ showControl: true }), 300)
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false, 'fade')
      }
      this.startTime()
    }
  }

  onSliderValChange (val) {
    this.timer && clearTimeout(this.timer)
    this.setState({ currentTime: parseInt(val) })
    this.changeForward(parseInt(val) > this.compareVal)
  }

  onSlidingComplete (val) {
    this.endChange(val)
  }

  onGestureEvent (event) {
    this.timer && clearTimeout(this.timer)
    this.setState({ paused: true })
    const { translationX } = event.nativeEvent
    this.changeForward(translationX > 0)
    this.setState({ currentTime: this.compareVal + parseInt(translationX / 10) })
  }

  onHandlerStateChange (e) {
    const { state } = e.nativeEvent
    if (state === State.BEGAN) {
      this.compareVal = parseInt(this.state.currentTime)
    }
    if (state === State.END) {
      this.endChange(this.state.currentTime)
    }
  }

  changeForward = (status) => {
    const { forward, backward } = this.state
    if (status) {
      backward && this.setState({ backward: false })
      !forward && this.setState({ forward: true })
    } else {
      forward && this.setState({ forward: false })
      !backward && this.setState({ backward: true })
    }
  }

  endChange = (val) => {
    const { forward, backward, paused } = this.state
    this.timer && clearTimeout(this.timer)
    this.player && this.player.seek(parseInt(val))
    paused && this.setState({ paused: false })
    forward && this.setState({ forward: false })
    backward && this.setState({ backward: false })
    this.startTime()
  }

  render () {
    const { loadStart, showControl, fullScreen, paused, isBuffering, loadEnd, forward, backward, currentTime } = this.state
    const { videoDuration, source, videoProps = {}, sliderProps = {}, headerLeftIcon } = this.props
    return (
      <View style={{ flex: 1 }} onLayout={(e) => {
        let { width, height } = e.nativeEvent.layout
        let isLandscape = (width > height)
        if (isLandscape) {
          this._clickStartAnimation(this.setState({ width, height: height, paddingTop: 0, paddingHorizontal: IPhoneXSafeArea }))
        } else {
          this._clickStartAnimation(this.setState({ width: WIDTH, height: WIDTH / 16 * 9, paddingHorizontal: 0 }))
        }
      }}>
        <HeaderStatusBar showStatusBar={!showControl} />
        <View style={{ backgroundColor: '#000', paddingTop: this.state.paddingTop }}>
          <Video
            style={
              {
                width: this.state.width,
                height: this.state.height
              }
            }
            repeat
            onProgress={this.onProgress}
            paused={this.state.paused}
            source={source}
            ref={player => { this.player = player }}
            onBuffer={this.onBuffer}
            onLoad={this.onLoad}
            onError={(e) => console.log(e, 'error')}
            onEnd={() => {
              this.setState({ loadEnd: true })
            }}
            {...videoProps}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: this.state.paddingHorizontal,
            top: 0,
            left: 0,
            right: 0 }}>
            <NavHeader headerLeftIcon={headerLeftIcon} onHeaderLeftPress={this.onHeaderLeftPress} />
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, justifyContent: 'flex-end' }} onPress={() => { this.onClickVideo() }}>
              <PanGestureHandler onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onHandlerStateChange}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  {
                    loadEnd ? null
                      : <VideoButton
                        isBuffering={isBuffering}
                        paused={paused}
                        duration={videoDuration}
                        currentTime={currentTime}
                        onClickPause={this.onClickPause}
                        showControl={showControl}
                        forward={forward}
                        backward={backward}
                      />
                  }
                </View>
              </PanGestureHandler>
              {
                showControl && !loadEnd ? <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 14, paddingHorizontal: 12 }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{utils.Tools.videoDuration(parseInt(this.state.currentTime))}/<Text>{utils.Tools.videoDuration(videoDuration)}</Text></Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: fullScreen ? 'space-between' : 'flex-end', flex: 1 }}>
                    {
                      fullScreen ? <Slider
                        value={parseInt(this.state.currentTime)}
                        onSlidingStart={(val) => {
                          this.compareVal = parseInt(val)
                          this.setState({ paused: true })
                        }}
                        onSlidingComplete={this.onSlidingComplete}
                        onValueChange={this.onSliderValChange}
                        style={{ height: 10, flex: 1, marginHorizontal: 14 }}
                        trackStyle={[styles.track, { backgroundColor: '#fff' }]}
                        thumbStyle={styles.thumb}
                        maximumValue={videoDuration}
                        minimumTrackTintColor='#ce3d3a'
                        thumbTouchSize={{ width: 50, height: 40 }}
                        {...sliderProps}
                      /> : null
                    }
                    <TouchableOpacity onPress={this.onClickFullScreen}>
                      <SvgIcon fill={['#fff']} path={fullScreen ? iconPath.partScreen : iconPath.fullScreen} size={18} />
                    </TouchableOpacity>
                  </View>
                </View> : null
              }
            </TouchableOpacity>
          </View>
          {loadStart && !fullScreen && !loadEnd
            ? <Slider
              value={parseInt(this.state.currentTime)}
              onSlidingStart={(val) => {
                this.compareVal = parseInt(val)
                this.setState({ paused: true })
              }}
              onSlidingComplete={this.onSlidingComplete}
              onValueChange={this.onSliderValChange}
              style={styles.container}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              maximumValue={videoDuration}
              minimumTrackTintColor='#ce3d3a'
              thumbTouchSize={{ width: 50, height: 40 }}
              {...sliderProps}
            /> : null
          }
        </View>
        {this.props.children}
      </View>
    )
  }
}

export default VideoPlayerContainer

const HeaderStatusBar = (props) => {
  const { showStatusBar } = props
  return (
    Platform.OS === 'ios' ? <StatusBar animated barStyle={'light-content'} hidden={showStatusBar} /> : null
  )
}

const NavHeader = (props) => {
  const { headerLeftIcon, onHeaderLeftPress } = props
  return (
    <View style={{
      paddingTop: HeaderPaddingTop
    }}>
      <View style={{
        width: WIDTH,
        height: Header,
        flexDirection: 'row'
      }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.headerLeft}
          onPress={() => onHeaderLeftPress()}
        >
          {headerLeftIcon}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const VideoButton = (props) => {
  const { isBuffering, paused, onClickPause, showControl, forward, backward, duration, currentTime } = props
  if (isBuffering && !forward && !backward) {
    return (<View style={{ marginBottom: 20 }}>
      <ActivityIndicator color={'#fff'} />
    </View>)
  }
  if (forward) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <SvgIcon fill={['#fff']} path={iconPath.forward} size={30} />
        <Text style={{ color: '#fff' }}>{utils.Tools.videoDuration(currentTime)}<Text style={{ color: '#ccc' }}>/{utils.Tools.videoDuration(duration)}</Text></Text>
      </View>
    )
  }
  if (backward) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <SvgIcon fill={['#fff']} path={iconPath.backward} size={30} />
        <Text style={{ color: '#fff' }}>{utils.Tools.videoDuration(currentTime)}<Text style={{ color: '#ccc' }}>/{utils.Tools.videoDuration(duration)}</Text></Text>
      </View>
    )
  }
  return (
    showControl
      ? <TouchableOpacity style={styles.button} activeOpacity={1} onPress={onClickPause}>
        <SvgIcon fill={['#fff']} path={paused ? iconPath.mvPlayIn : iconPath.pause} size={20} />
      </TouchableOpacity> : null
  )
}

const styles = StyleSheet.create({
  container: {
    bottom: -4,
    left: 0,
    right: 0,
    position: 'absolute',
    height: 10
  },
  track: {
    height: 2,
    backgroundColor: '#999'
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#ce3d3a',
    borderRadius: 10 / 2
  },
  headerLeft: {
    top: 1,
    width: 54,
    paddingLeft: 18,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1
  },
  headerRight: {
    top: 1,
    width: 54,
    paddingRight: 18,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

VideoPlayerContainer.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string
    }),
    PropTypes.number
  ]),
  videoProps: PropTypes.object,
  sliderProps: PropTypes.object,
  videoDuration: PropTypes.number,
  onNavLeftButtonPress: PropTypes.func,
  headerLeftIcon: PropTypes.element
}

VideoPlayerContainer.defaultProps = {
  source: { uri: 'http://vodkgeyttp8.vod.126.net/cloudmusic/593d/core/0c65/326c08e6fb50fdf5d84ab42288d43f5a.mp4?wsSecret=d2a030a55207893d9f3cc93121050a94&wsTime=1554957252' },
  videoDuration: 0,
  onNavLeftButtonPress: () => {},
  headerLeftIcon: <SimpleLine name={'arrow-left'} size={23} color={'#fff'} />
}
