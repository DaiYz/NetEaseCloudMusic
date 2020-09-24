import React from 'react'
import { View, StyleSheet, ViewPropTypes, Animated, ColorPropType } from 'react-native'
import PropTypes from 'prop-types'
class WaveLoading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.value = new Animated.Value(0)
  }

  up (duration) {
    Animated.timing(this.value, { duration: duration, toValue: 1, useNativeDriver: false }).start(
      () => this.down()
    )
  }

  down (duration) {
    Animated.timing(this.value, { duration: duration, toValue: 0, useNativeDriver: false }).start(
      () => this.up()
    )
  }

  componentDidMount () {
    const { duration } = this.props
    this.up(duration)
  }

  render () {
    const { lineColor, baseHeight, targetHeight, lineStyle = {} } = this.props
    return (
      <View style={[styles.container, { width: this.props.size, height: this.props.size }]}>
        {
          baseHeight.map((item, index) =>
            <Animated.View
              key={index} style={[styles.line, { backgroundColor: lineColor }, lineStyle, {
                height: this.value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [item, targetHeight[index]]
                })
              }]}
            />
          )
        }
      </View>
    )
  }
}

export default WaveLoading

WaveLoading.propTypes = {
  lineColor: ColorPropType,
  lineStyle: ViewPropTypes.style,
  size: PropTypes.number,
  duration: PropTypes.number,
  baseHeight: PropTypes.array,
  targetHeight: PropTypes.array
}
WaveLoading.defaultProps = {
  lineColor: 'red',
  duration: 240,
  baseHeight: [10, 20, 12, 16],
  targetHeight: [16, 12, 20, 10],
  size: 20
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  line: {
    width: 1.6,
    marginRight: 4,
    borderRadius: 2
  }

})
