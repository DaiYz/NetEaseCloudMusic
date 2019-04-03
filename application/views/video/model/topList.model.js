import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import * as iconPath from '../../../source/svg'
import IconFont from 'react-native-svg-iconfont'
import { NavigationActions } from 'react-navigation'
import moment from 'moment/moment'
class TopListModel {
  @observable loading = false
  @observable page = 0
  @observable hasMore = 0
  @observable updateTime = moment.now()
  @observable topList = []
  @observable topListDetail = {}

  @action async getTopList (more = false, limit = 10) {
    try {
      if (more) {
        this.loading = true
      }
      const page = more ? this.page + 1 : 0
      const data = await utils.Seesions.top.Get(`/mv?limit=${limit}&offset=${page}&timestamp=${moment.now()}`)
      if (data.code === 200) {
        this.topList = more ? this.topList.slice().concat(data.data) : data.data
        this.hasMore = data.hasMore
        this.updateTime = data.updateTime
        this.page = page
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @action getRankId (id = '') {
    let compareId = `${id}`
    const resp = RANKID.filter((item) => compareId === item.id)
    if (resp.length === 0) {
      return ''
    }
    return resp[0].idx
  }

  @action async getTopListDetail (id = '') {
    try {
      this.loading = true
      const idx = this.getRankId(id)
      if (idx.length === 0) {
        return utils.global.navigator.dispatch(NavigationActions.back())
      } else {
        const data = await utils.Seesions.top.Get(`/list?idx=${idx}&timestamp=${moment.now()}`)
        if (data.code === 200) {
          this.topListDetail = data.playlist
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @computed get detailList () {
    const newDetail = Object.assign({}, this.topListDetail)
    const { tracks = [] } = newDetail
    if (tracks.length === 0) {
      return [{ title: 'data', data: [] }]
    } else {
      return [{ title: 'data', data: tracks.slice() }]
    }
  }

  @computed get newTopList () {
    if (this.topList.length === 0) {
      return []
    } else {
      let newData = []
      const offical = this.topList.filter((item) => item.ToplistType)
      const globalM = this.topList.filter((item) => !item.ToplistType)
      newData.push(offical)
      newData.push(globalM)
      return newData.slice()
    }
  }
}

export default TopListModel
