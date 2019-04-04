import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import { Header } from 'react-navigation'
import moment from 'moment'
const { width, height } = Dimensions.get('window')
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const androidStatusBarHeight = StatusBar.currentHeight || 0
const customHeader = 44

const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024
const IPADPRO11_WIDTH = 834
const IPADPRO11_HEIGHT = 1194
const IPADPRO129_HEIGHT = 1024
const IPADPRO129_WIDTH = 1366
// iphone6 像素
const basePx = Platform.OS === 'ios' ? 750 : 720

const Px2Dp = (px: number) => {
  const layoutSize = (px / basePx) * width

  return PixelRatio.roundToNearestPixel(layoutSize)
}

const FontSize = (size: number) => {
  // iphone 5s and older Androids
  if (width < 360) {
    return size - 1
  }
  // iphone 5
  else if (height < 667) {
    return size
  }
  // iphone 6-6s
  else if (height >= 667 && height <= 735) {
    return size + 1
  } else if (height >= 735) {
    return size + 2
  }
  return size
}

const isIPhoneX = () => {
  return (
    (Platform.OS === 'ios' &&
      ((height === X_HEIGHT && width === X_WIDTH) ||
        (height === X_WIDTH && width === X_HEIGHT))) ||
    ((height === XSMAX_HEIGHT && width === XSMAX_WIDTH) ||
      (height === XSMAX_WIDTH && width === XSMAX_HEIGHT))
  )
}

const NavHeight = (isCustom: true) => {
  const IPhoneX = isIPhoneX()
  const IosNavHeader = IPhoneX ? (IPhoneXPaddingTop + iosStatusBarHeight + customHeader) : (iosStatusBarHeight + customHeader)
  const AndroidNavHeader = androidStatusBarHeight + (isCustom ? customHeader : Header.HEIGHT)
  return (Platform.OS === 'ios' ? IosNavHeader : AndroidNavHeader)
}

const processNum = (num = 0) => {
  if (num >= 10000) {
    return `${parseInt(num / 10000)}万`
  }
  if (num >= 100000000) {
    return `${parseInt(num / 100000000)}亿`
  }
  return `${num}`
}

const processTime = (ts) => {
  const diffDay = moment().diff(moment(ts), 'days')
  let str = ''
  switch (diffDay) {
    case 0:
      str = `${moment(ts).format('HH:mm')}`
      break
    case 1:
      str = `昨天 ${moment(ts).format('HH:mm')}`
      break
    case 2:
      str = `前天 ${moment(ts).format('HH:mm')}`
      break
    default:
      str = `${moment(ts).format('MoDo HH:mm')}`
      break
  }
  return str
}

const videoDuration = (s) => {
  const h = 3600
  const m = 60
  let H = ''
  let M = '00'
  let S = '00'
  if (s < 3600) {
    M = `${parseInt(s / m) > 9 ? parseInt(s / m) : '0' + parseInt(s / m)}`
    S = `${parseInt(s % m) > 9 ? parseInt(s % m) : '0' + parseInt(s % m)}`
  } else {
    let leftS = s % h
    H = `${parseInt(s / h) > 9 ? parseInt(s / h) : '0' + parseInt(s / h)}`
    if (leftS >= 60) {
      M = `${parseInt(leftS / m) > 9 ? parseInt(leftS / m) : '0' + parseInt(leftS / m)}`
    }
    S = `${parseInt(leftS % m) > 9 ? parseInt(leftS % m) : '0' + parseInt(leftS % m)}`
  }
  if (H) {
    return `${H}:${M}:${S}`
  } else {
    return `${M}:${S}`
  }
}

export default {
  Px2Dp,
  FontSize,
  isIPhoneX,
  NavHeight,
  processNum,
  videoDuration,
  processTime
}
