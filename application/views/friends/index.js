import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import SegmentedControl from '../../components/segmentedControl'
import { FriendsModel } from './model'
import ImagePlaceholder from '../../components/imagePlaceholder'
import { observer } from 'mobx-react'
const { width } = Dimensions.get('window')
@observer
class FriendsScreen extends React.Component {
  FriendsModel = new FriendsModel()
  state={
    selectedIndex: 0
  }

  getWidthAndHeight = (item, len) => {
    const defaultContainerWidth = (width - 14 - 14)
    const defaultImageWidth = defaultContainerWidth / 2
    if (len === 1) {
      if (item.width === item.height) {
        return {
          width: defaultImageWidth,
          height: defaultImageWidth
        }
      }
      if (item.width < item.height) {
        return {
          width: defaultImageWidth,
          height: item.heigh / (item.width / defaultImageWidth)
        }
      } else {
        return {
          width: item.width / (item.height / defaultImageWidth),
          height: defaultImageWidth
        }
      }
    } else {
      if (len === 2) {
        return {
          width: (defaultContainerWidth - 4 - 56) / 2,
          height: (defaultContainerWidth - 4 - 56) / 2
        }
      } else {
        return {
          width: (defaultContainerWidth - 8 - 56) / 2,
          height: (defaultContainerWidth - 8 - 56) / 2
        }
      }
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <SegmentedControl
          selectedIndex={this.state.selectedIndex}
          onValueChange={(index) => {
            this.setState({ selectedIndex: index })
          }}
        />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={this.FriendsModel.list.slice()}
          renderItem={({ item, index }) => <ListItem data={item} getWidthAndHeight={this.getWidthAndHeight} />}
        />
      </View>
    )
  }
}

const ListItem = (props) => {
  const { data, getWidthAndHeight } = props
  const { json = '', pics = [], user = {}, info = {} } = data
  const { commentThread = {} } = info
  const { resourceInfo = {} } = commentThread
  let jsonObj = JSON.parse(json)
  let len = pics.length
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 16 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 8 }}>
              <ImagePlaceholder source={{ uri: user.avatarUrl }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#477aac' }}>{user.nickname}</Text>
              <Text style={{ color: '#666', marginLeft: 8 }}>{resourceInfo?.name ? `${resourceInfo.name.split('：')[0]}:` : '发布视频:'}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, marginLeft: 56 }}>
          <Text style={{ lineHeight: 24 }}>{jsonObj.msg}</Text>
          <View>
            {
              pics.map((item, index) =>
                <TouchableOpacity>
                  <ImagePlaceholder style={[getWidthAndHeight(item, len), { borderRadius: 3 }]} />
                </TouchableOpacity>
              )
            }
          </View>
        </View>

      </View>

    </TouchableOpacity>
  )
}

export default FriendsScreen
