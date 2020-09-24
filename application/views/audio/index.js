import React from 'react'
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Easing,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { inject, observer } from 'mobx-react'
import Video from 'react-native-video'
import Slider from 'react-native-slider'
import images from '../../source/images'
import ImagePlaceholder from '../../components/imagePlaceholder'
import NavHeader from '../../components/navHeader'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'
import utils from '../../utils'
import moment from 'moment'
const { width, height } = Dimensions.get('window')

@inject('account', 'app')
@observer
class AudioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super(props)
    this.animateValue = new Animated.Value(0)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.myAnimate = Animated.timing(this.animateValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.inOut(Easing.linear)
    })
    this.buttons = [
      <SvgIcon path={iconPath.heartOut} fill={['#fff']} size={24} />,
      <SvgIcon path={iconPath.download} fill={['#fff']} size={24} />,
      <SvgIcon path={iconPath.soundEffect} fill={['#fff']} size={24} />,
      <SvgIcon path={iconPath.comments} fill={['#fff']} size={24} />,
      <SvgIcon path={iconPath.more} fill={['#fff']} size={24} />
    ]
    this.state = {
      discWidthAndHeight: 200,
      startAnimation: false,
      duration: 0,
      currentTime: 0
    }
  }

  componentDidMount (): void {
  }

  rotate = () => {
    if (!this.props.app.audioPause) {
      this.animateValue.setValue(0)
      this.myAnimate.start(() => {
        this.rotate()
      })
    }
  }

  play () {
    const { app } = this.props
    const { audioPause } = app
    if (audioPause) {
      this.pause()
    } else {
      this.myAnimate.start(() => {
        this.myAnimate = Animated.timing(this.animateValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.inOut(Easing.linear)
        })
        this.setState({ startAnimation: true })
        this.rotate()
      })
    }
  }

  pause () {
    this.animateValue.stopAnimation((oneTimeRotate) => {
      // 计算角度比例
      this.myAnimate = Animated.timing(this.animateValue, {
        toValue: 1,
        duration: (1 - oneTimeRotate) * 10000,
        easing: Easing.inOut(Easing.linear)
      })
    })
    this.setState({ startAnimation: false })
  }

  onProgress (e) {
    if (!this.state.startAnimation) {
      this.setState({ startAnimation: true })
      this.rotate()
    }
    this.setState({ currentTime: parseInt(e.currentTime) })
  }

  onLoad (e) {
    this.setState({ duration: parseInt(e.duration) })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  componentWillUnmount (): void {

  }

  render () {
    const { navigation, app } = this.props
    const { playMode, audioPause, isAudioPlay, changePlayMode } = app
    const { duration, currentTime } = this.state
    const { state = {} } = navigation
    const { params = {} } = state
    const { detail = {} } = params
    const { al = {}, name, urlDetail = {} } = detail
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ width, height, position: 'absolute' }} source={{ uri: al.picUrl }} blurRadius={50} />
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <NavHeader
          onHeaderLeftPress={this.goBack}
          headerLeftIcon={<SimpleLine name={'arrow-left'} size={23} color={'#fff'} />}
          headerRightIcon={<SvgIcon path={iconPath.share} fill={['#fff']} size={23} />}
          headerTitle={name}
        />
        <View style={{ flex: 1, paddingBottom: utils.Tools.isIPhoneX() ? 38 : 0 }}>
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onLayout={(e) => {
                const { width, height } = e.nativeEvent.layout
                if (width > height) {
                  if (width - height >= 52) {
                    this.setState({
                      discWidthAndHeight: height
                    })
                  } else {
                    this.setState({
                      discWidthAndHeight: height - (52 - (width - height))
                    })
                  }
                } else {
                  this.setState({
                    discWidthAndHeight: width - 52
                  })
                }
                this.setState({
                  discWidthAndHeight: width > height ? height : width - 52
                })
              }}>
              <Disc picUrl={al.picUrl} discWidthAndHeight={this.state.discWidthAndHeight} animatedValue={this.animateValue} />
            </View>
            <View style={{ paddingHorizontal: 12 }}>
              <ButtonActions buttons={this.buttons} />
              <SliderContainer
                duration={duration}
                currentTime={currentTime}
              />
              <AudioControl
                changePlayMode={changePlayMode}
                animatedPlay={this.play}
                playMode={playMode}
                pause={audioPause}
                play={isAudioPlay}
              />
            </View>
          </View>
          {/* <Needle /> */}
          <Video
            source={{ uri: urlDetail.url }}
            ref='video'
            volume={1.0}
            repeat={playMode === 1}
            onError={(e) => console.log(e)}
            paused={audioPause}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
            playInBackground
          />
        </View>
      </View>
    )
  }
}

export default AudioScreen

const Needle = (props) => {
  return (
    <View style={{ position: 'absolute', left: width / 2 - 14, top: 0, zIndex: 999 }}>
      <ImagePlaceholder source={images.needle} style={{ width: 96, height: 137 }} />
    </View>
  )
}

const Disc = (props) => {
  const { picUrl, discWidthAndHeight, animatedValue } = props
  return (
    <Animated.View style={[{
      justifyContent: 'center', alignItems: 'center'
    }, {
      transform: [{ rotate: animatedValue.interpolate(
        {
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        }
      ) }]
    }]}>
      <ImagePlaceholder source={{ uri: picUrl }} style={{ width: discWidthAndHeight - 50, height: discWidthAndHeight - 50, borderRadius: (discWidthAndHeight - 50) / 2, position: 'absolute' }} />
      <ImagePlaceholder source={images.disc} style={{ width: discWidthAndHeight, height: discWidthAndHeight }} />
    </Animated.View>
  )
}

const SliderContainer = (props) => {
  const { duration, currentTime } = props
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: '#dddddd80', fontSize: 11 }}>{utils.Tools.videoDuration(currentTime)}</Text>
      <Slider
        style={{ height: 10, flex: 1, marginHorizontal: 6 }}
        value={currentTime}
        maximumValue={duration}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
      />
      {duration === 0 ? <ActivityIndicator color={'#dddddd80'} size={'small'} /> : <Text style={{ color: '#dddddd80', fontSize: 11 }}>{utils.Tools.videoDuration(duration)}</Text>}
    </View>
  )
}

const AudioControl = (props) => {
  const { playMode, pause, play, animatedPlay, changePlayMode } = props
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 14, justifyContent: 'space-between', paddingHorizontal: 18 }}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => changePlayMode()}>
        <SvgIcon path={playMode === 0 ? iconPath.listRepeat : playMode === 1 ? iconPath.singleRepeat : iconPath.randomPlay} fill={['#fff']} size={24} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity>
          <SvgIcon path={iconPath.before} fill={['#fff']} size={24} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.playButton} onPress={() => {
          play(!pause)
          animatedPlay()
        }}>
          <SvgIcon path={pause ? iconPath.mvPlay : iconPath.pause} fill={['#fff']} size={22} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <SvgIcon path={iconPath.next} fill={['#fff']} size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <SvgIcon path={iconPath.audioList} fill={['#fff']} size={24} />
      </TouchableOpacity>
    </View>
  )
}

const ButtonActions = (props) => {
  const { buttons } = props
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 22, justifyContent: 'space-between', paddingHorizontal: 18 }}>
      {
        buttons.map((item, index) =>
          <TouchableOpacity key={index}>
            {item}
          </TouchableOpacity>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 8 / 2
  },
  track: {
    height: 2,
    backgroundColor: '#dddddd70'
  },
  playButton: {
    width: 48,
    height: 48,
    marginHorizontal: 30,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1
  }
})
