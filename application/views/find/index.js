import React, { Component } from 'react'
import {
  View,
  Dimensions
} from 'react-native'
import { inject, observer } from 'mobx-react'
import ScrollableTabView from '../../components/scrollTabView'
import SearchHeader from '../../components/searchHeader'
import Personalized from './Personalized'
import SearchHome from '../search/SearchHome'
import Host from './Host'
import utils from '../../utils'
@inject('account')
@observer
class FindScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return { header: null }
  }
  constructor (props) {
    super(props)
    this.state = {
      play: false,
      showSearchHome: false
    }
  }

  render () {
    const { showSearchHome, play } = this.state
    return (
      <View style={{ flex: 1 }}>
        <SearchHeader
          isPlaying={play}
          onSearchPress={() => { this.setState({ showSearchHome: true }) }}
          onCancelPress={() => { this.setState({ showSearchHome: false }) }}
        />
        <ScrollableTabView
          tabBarBackgroundColor={'#ce3d3a'}
          tabBarActiveTextColor={'#fff'}
          tabBarInactiveTextColor={'#fff'}
        >
          <Personalized tabLabel='个性化推荐' />
          <Host tabLabel='主播电台' />
        </ScrollableTabView>
        {
          showSearchHome
            ? <SearchHome NavHeight={utils.Tools.NavHeight()} />
            : null
        }
      </View>
    )
  }
}

export default FindScreen
