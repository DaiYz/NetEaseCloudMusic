import React from 'react'
import { View, ViewPropTypes, Animated, ColorPropType, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
class SegmentedControl extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.WIDTH = 140
    this.HEIGHT = 30
    this.interpolate = this.inPutAndOutPut()
    this.value = new Animated.Value(props.selectedIndex)
  }

  inPutAndOutPut = () => {
    const { values, style = {} } = this.props
    let len = values.length
    let targetWidth = style.width || this.WIDTH
    let input = []
    let outPut = []
    for (let i = 0; i < len; i++) {
      input.push(i)
      outPut.push(i * (targetWidth / len))
    }
    return {
      inputRange: input,
      outputRange: outPut
    }
  }

  componentDidMount () {
    console.log(this.inputRange)
  }

  componentWillReceiveProps (nextProps) {
    Animated.timing(this.value, { duration: 200, toValue: nextProps.selectedIndex }, { useNativeDriver: true }).start()
  }

  render () {
    const { values, selectedIndex, onValueChange, style = {}, tintColor } = this.props
    let targetHeight = style.height || this.HEIGHT
    return (
      <View style={[{
        height: this.HEIGHT,
        width: this.WIDTH,
        borderRadius: this.HEIGHT / 2,
        borderColor: '#e26164',
        borderWidth: 0.8,
        overflow: 'hidden',
        flexDirection: 'row'
      }, style]}>
        <Animated.View style={[{
          height: '100%',
          width: `${parseInt((1 / values.length) * 100)}%`,
          backgroundColor: '#ce3d3a',
          borderRadius: targetHeight / 2,
          position: 'absolute' },
        {
          transform: [{
            translateX: this.value.interpolate(this.interpolate)
          }]
        }
        ]}
        />
        {
          values.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                onPress={() => onValueChange(index)}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ color: selectedIndex === index ? '#fff' : tintColor, fontSize: 15 }}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

export default SegmentedControl

SegmentedControl.propTypes = {
  style: ViewPropTypes.style,
  values: PropTypes.array,
  enabled: PropTypes.bool,
  selectedIndex: PropTypes.number,
  onValueChange: PropTypes.func,
  tintColor: ColorPropType
}
SegmentedControl.defaultProps = {
  values: ['动态', '附近'],
  selectedIndex: 0,
  tintColor: '#ce3d3a'
}
