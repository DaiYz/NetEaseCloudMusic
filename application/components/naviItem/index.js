import React from 'react'
import { View, StyleSheet, ViewPropTypes, Dimensions, Switch, Text, TouchableOpacity } from 'react-native'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import PropTypes from 'prop-types'
const { width } = Dimensions.get('window')
class NavItem extends React.Component {
  renderRight = () => {
    const { itemType, rightExtraTitle, rightIcon, switchProps } = this.props
    if (itemType === 'switch') {
      return (
        <Switch
          style={{ shadowOpacity: 0 }}
          trackColor={{ true: '#ce3d3a' }}
          {...switchProps}
        />
      )
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          {rightExtraTitle}
          {rightIcon}
        </View>
      )
    }
  }

  render () {
    const { leftIcon, bottomLineStyle, itemTitle = '', itemType, showItemSeparator, itemStyle, itemTitleStyle, rightContainer } = this.props
    const Element = itemType === 'switch' ? View : TouchableOpacity
    return (
      <Element activeOpacity={0.7} style={[ styles.container, itemStyle ]}>
        {leftIcon}
        <View style={{ flex: 1 }}>
          <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, paddingRight: 14 }, rightContainer]}>
            <Text style={[{ fontSize: 16, color: '#333' }, itemTitleStyle]}>{itemTitle}</Text>
            {this.renderRight()}
          </View>
          {showItemSeparator ? <Line bottomLineStyle={bottomLineStyle} /> : null}
        </View>
      </Element>
    )
  }
}

const Line = (props) => {
  return (
    <View style={[{ width: '100%', height: 0.6, backgroundColor: '#ddd' }, props.bottomLineStyle]} />
  )
}

export default NavItem

NavItem.propTypes = {
  itemType: PropTypes.oneOf(['switch', 'normal']),
  showItemSeparator: PropTypes.bool,
  itemStyle: ViewPropTypes.style,
  bottomLineStyle: ViewPropTypes.style,
  rightContainer: ViewPropTypes.style,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  rightExtraTitle: PropTypes.element,
  onItemPress: PropTypes.func,
  itemTitle: PropTypes.string
}
NavItem.defaultProps = {
  itemType: 'normal',
  showItemSeparator: true,
  rightIcon: <SimpleLine name={'arrow-right'} size={12} color={'#bababa'} />
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 41,
    width
  },
  line: {
    width: 1.6,
    marginRight: 4,
    borderRadius: 2
  }
})
