import React from 'react'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import utils from '../../utils'
class Badge extends React.Component {
  getNumber () {
    const { number } = this.props
    if (number > 99) {
      return '...'
    } else {
      return `${number}`
    }
  }

  render () {
    return (
      <View style={[styles.container, { height: utils.Tools.Px2Dp(40) }, this.props.style]}>
        <Text style={[styles.text, { fontSize: utils.Tools.FontSize(this.props.number > 9 ? 8 : 10) }, this.props.labelStyle]}>{this.getNumber()}</Text>
      </View>
    )
  }
}

export default Badge

Badge.propTypes = {
  number: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style
}
Badge.defaultProps = {
  number: 1,
  style: {},
  labelStyle: {}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: utils.Tools.Px2Dp(40),
    borderRadius: utils.Tools.Px2Dp(20),
    borderWidth: utils.Tools.Px2Dp(4),
    borderColor: '#fff',
    backgroundColor: '#d33a31'
  },
  text: {
    color: '#fff',
    fontSize: utils.Tools.FontSize(10)
  }
})
