import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'

class account {
  @observable userProfile = {
    'experts': {},
    'backgroundImgId': 109951162868126480,
    'userType': 0,
    'mutual': false,
    'remarkName': null,
    'expertTags': null,
    'authStatus': 0,
    'backgroundUrl': 'http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg',
    'nickname': 'test',
    'birthday': -2209017600000,
    'avatarImgId': 109951163250239070,
    'city': 310101,
    'accountStatus': 0,
    'userId': 1812919102,
    'vipType': 0,
    'gender': 0,
    'defaultAvatar': true,
    'avatarUrl': 'https://p1.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg',
    'province': 310000,
    'djStatus': 0,
    'avatarImgIdStr': '109951163250239066',
    'backgroundImgIdStr': '109951162868126486',
    'signature': '',
    'authority': 0,
    'description': '',
    'detailDescription': '',
    'followed': false,
    'avatarImgId_str': '109951163250239066',
    'artistIdentity': [],
    'followeds': 0,
    'follows': 3,
    'cCount': 0,
    'blacklist': false,
    'eventCount': 9,
    'sDJPCount': 0,
    'allSubscribedCount': 0,
    'playlistCount': 1,
    'playlistBeSubscribedCount': 0,
    'sCount': 0
  }

  @persist @observable authToken: String = ''

  @action.bound add () {
    let newBadge = this.userProfile.eventCount
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
