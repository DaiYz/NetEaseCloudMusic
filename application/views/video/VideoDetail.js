import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  ActivityIndicator,
  Platform
} from 'react-native'
import Video from 'react-native-video'
import Slider from 'react-native-slider'
import VideoPlayerContainer from '../../components/videoPlayer'
import utils from '../../utils'
import SvgIcon from 'react-native-svg-iconfont'
import * as iconPath from '../../source/svg'
import { inject, observer } from 'mobx-react'
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
const isIPhoneX = utils.Tools.isIPhoneX()
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const Header = 44
const HeaderPaddingTop = isIPhoneX ? (IPhoneXPaddingTop + iosStatusBarHeight) : Platform.OS === 'ios' ? iosStatusBarHeight : 0
const videoPaddingTop = isIPhoneX ? (IPhoneXPaddingTop + 8) : 0
const IPhoneXSafeArea = isIPhoneX ? 80 : 0
@inject('account', 'app')
@observer
class VideoDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { header: null }
  }
  constructor (props) {
    super(props)
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

  render () {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }} >
        <VideoPlayerContainer
          videoDuration={291}
          onNavLeftButtonPress={() => navigation.goBack()}
        >
          <FlatList
            data={[1, 2, 3, 45, 6, 7, 8, 9, 1, 3, 5, 6, 7, 8]}
            renderItem={({ item }) => <View style={{ height: 44, marginVertical: 10 }}><Text>{item}</Text></View>}
            keyExtractor={(item, index) => `${index}`}
          />
        </VideoPlayerContainer>
      </View>
    )
  }
}

export default VideoDetail
