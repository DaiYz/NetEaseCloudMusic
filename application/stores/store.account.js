import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'

class account {
  @observable badge: number = 6

  @observable userProfile = {
    'userId': 1812919102,
    'vipType': 0,
    'accountStatus': 0,
    'gender': 0,
    'nickname': 'test',
    'birthday': -2209017600000,
    'city': 310101,
    'djStatus': 0,
    'experts': {},
    'userType': 0,
    'avatarUrl': 'https://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg',
    'backgroundUrl': 'http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg'
  }

  @persist @observable authToken: String = ''

  @action.bound add () {
    let newBadge = this.badge
    newBadge++
    this.badge = newBadge
    utils.global.navigator.dispatch(NavigationActions.setParams({
      params: { badge: newBadge },
      key: 'Account'
    }))
  }

  @action.bound login () {
    this.authToken = 'xnjidijfeiw67879fasfa'
    utils.global.navigator.dispatch(NavigationActions.navigate(
      {
        routeName: 'App'
      }
    ))
  }

  @action.bound logout () {
    this.authToken = ''
    utils.global.navigator.dispatch(NavigationActions.navigate(
      {
        routeName: 'Auth'
      }
    ))
  }
}

export default account
