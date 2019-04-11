import { observable, computed, action, autorun } from 'mobx'
import { persist } from 'mobx-persist'
import { zh_cn, en_us } from '../localize/strings'
import { yellow, blue } from '../localize/theme'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'
import Splash from 'react-native-splash-screen'

class app {
  @persist @observable appTheme = 'light'
  @observable theme = blue
  @observable banners = []
  @observable scrollEnabled = true
  @observable playNow = {
    id: '121212121',
    playing: false
  }
  @observable currentTheme = '蓝色主题'

  @action.bound changeTheme (type: String) {
    switch (type) {
      case 'yellow':
        this.theme = yellow
        this.currentTheme = '黄色主题'
        break
      case 'blue':
        this.theme = blue
        this.currentTheme = '蓝色主题'
        break
    }
    this.appTheme = type
    utils.global.navigator.dispatch(NavigationActions.setParams({
      params: { theme: this.theme },
      key: 'Account'
    }))
  }

  @action.bound async init (token, theme) {
    let targetRout = 'Auth'
    if (token.length > 0) {
      targetRout = 'App'
    }
    this.changeTheme(theme)
    await this.getBanner()
    utils.global.navigator.dispatch(NavigationActions.navigate({
      routeName: targetRout
    }))
  }

  @action.bound async getBanner () {
    try {
      const data = await utils.Seesions.banner.Get('')
      if (data.code === 200) {
        this.banners = data.banners
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default app
