import React from 'react'
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { inject, observer } from 'mobx-react'
import Video from 'react-native-audio'
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
    this.state = {

    }
  }

  componentDidMount (): void {
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { state = {} } = navigation
    const { params = {} } = state
    const { detail = {} } = params
    const { al = {} } = detail
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ width, height, position: 'absolute' }} source={{ uri: al.picUrl }} blurRadius={50} />
        <NavHeader
          onHeaderLeftPress={this.goBack}
          headerLeftIcon={<SimpleLine name={'arrow-left'} size={23} color={'#fff'} />}
          headerRightIcon={<SvgIcon path={iconPath.share} fill={['#fff']} size={23} />}
          headerTitle={'难念的经'}
        />
        <View style={{ flex: 1, paddingBottom: utils.Tools.isIPhoneX() ? 38 : 0 }}>
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ImagePlaceholder source={images.disc} style={{ width: 200, height: 200 }} />
            </View>
            <View>
              <SliderContainer />
            </View>
          </View>

        </View>
      </View>
    )
  }
}

export default AudioScreen

const SliderContainer = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{utils.Tools.videoDuration(0)}</Text>
      <Slider
        style={{ height: 10, flex: 1, marginHorizontal: 6 }}
      />
      <Text>{utils.Tools.videoDuration(308)}</Text>
    </View>
  )
}

const AudioControl = (props) => {
  return (
    <View>
      <SvgIcon path={iconPath.before} fill={['#fff']} />
      <View>
        <SvgIcon path={iconPath.mvPlayIn} fill={['#fff']} />
      </View>
      <SvgIcon path={iconPath.next} fill={['#fff']} />

    </View>
  )
}
