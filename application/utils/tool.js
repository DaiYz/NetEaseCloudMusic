import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import { Header } from 'react-navigation'
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

const processsNum = (num = 0) => {
  if (num >= 10000) {
    return `${parseInt(num / 10000)}万`
  }
  if (num >= 100000000) {
    return `${parseInt(num / 100000000)}亿`
  }
  return `${num}`
}

export default {
  Px2Dp,
  FontSize,
  isIPhoneX,
  NavHeight,
  processsNum
}
