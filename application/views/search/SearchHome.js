import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet, Text, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
const { height, width } = Dimensions.get('window')

class SearchHome extends Component {
  render () {
    const { NavHeight } = this.props
    return (
      <View style={[styles.container, { top: NavHeight }]}>
        <ScrollView >
          <Item />
        </ScrollView>
      </View>
    )
  }
}

const Item = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text>按歌手搜索</Text>
        </View>
        <View />
      </View>
    </TouchableOpacity>
  )
}

export default SearchHome

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    backgroundColor: '#fff'
  },
  itemContainer: {
    height: 41,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#eee',
    borderBottomWidth: 0.8,
    paddingHorizontal: 12
  }
})
