import React from 'react'
import { View, Animated, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)
class MineSection extends React.Component {
  constructor (props) {
    super(props)
    const { show } = props
    this.animatedValue = new Animated.Value(show ? 1 : 0)
    this.hide = !show
  }

  rotate = () => {
    const { isShowItem, index } = this.props
<<<<<<< HEAD
    Animated.timing(this.animatedValue, { duration: 200, toValue: !this.hide ? 0 : 1 }, { useNativeDriver: true }).start(
=======
    Animated.timing(this.animatedValue, { duration: 200, toValue: !this.hide ? 0 : 1, useNativeDriver: true }).start(
>>>>>>> develop
      () => isShowItem(index, !this.hide)
    )
    this.hide = !this.hide
  }

  render () {
    const { title = '', listNum = 0 } = this.props
    return (
      <View style={{ backgroundColor: '#f2f4f5', height: 41, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => this.rotate()} activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AnimatedIcon
            name={'ios-arrow-forward'}
            size={20}
            color={'#333'}
            style={{
              marginRight: 8,
              transform: [{
                rotate: this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '90deg']
                })
              }]
            }}
          />
          <Text style={{ fontSize: 15, color: '#333', fontWeight: '500' }}>{title}<Text>{`(${listNum})`}
          </Text></Text>
        </TouchableOpacity>
        <View />
      </View>
    )
  }
}

export default MineSection
