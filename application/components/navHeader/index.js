import React from 'react'
import { Dimensions, Platform, TouchableOpacity, View, StyleSheet, Text, ViewPropTypes } from 'react-native'
import utils from '../../utils'
import PropTypes from 'prop-types'
const { width, height } = Dimensions.get('window')
const isIPhoneX = utils.Tools.isIPhoneX()
const IPhoneXPaddingTop = 24
const iosStatusBarHeight = 20
const Header = 44
const HeaderPaddingTop = isIPhoneX ? (IPhoneXPaddingTop + iosStatusBarHeight) : Platform.OS === 'ios' ? iosStatusBarHeight : 0

class NavHeader extends React.Component {
  static propTypes = {
    titleStyle: ViewPropTypes.style,
    headerTitle: PropTypes.string,
    renderHeaderTitle: PropTypes.func,
    headerLeftIcon: PropTypes.element,
    headerRightIcon: PropTypes.element,
    onHeaderLeftPress: PropTypes.func,
    onHeaderRightPress: PropTypes.func
  }

  static defaultProps = {
    onHeaderLeftPress: () => {},
    onHeaderRightPress: () => {}
  }

  render () {
    const { headerLeftIcon, onHeaderLeftPress, headerRightIcon, onHeaderRightPress, renderHeaderTitle, headerTitle, titleStyle } = this.props
    return (
      <View style={{
        paddingTop: HeaderPaddingTop
      }}>
        <View style={{
          width,
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            {
              renderHeaderTitle ? renderHeaderTitle()
                : <Text style={[{ color: '#fff', fontSize: 16, fontWeight: '500' }, titleStyle]} numberOfLines={1}>{headerTitle}</Text>
            }
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerRight}
            onPress={() => onHeaderRightPress()}
          >
            {headerRightIcon}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default NavHeader

const styles = StyleSheet.create({
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
  }
})
