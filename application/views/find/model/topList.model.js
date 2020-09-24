import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import * as iconPath from '../../../source/svg'
import IconFont from 'react-native-svg-iconfont'
<<<<<<< HEAD
import { NavigationActions } from 'react-navigation'
=======
// import { NavigationActions } from 'react-navigation'
>>>>>>> develop
import moment from 'moment/moment'
const RANKID = [
  {
    idx: '0',
    id: '3779629',
    name: '云音乐新歌榜'
  },
  {
    idx: '1',
    id: '3778678',
    name: '云音乐热歌榜'
  },
  {
    idx: '2',
    id: '2884035',
    name: '网易原创歌曲榜'
  },
  {
    idx: '3',
    id: '19723756',
    name: '云音乐飙升榜'
  },
  {
    idx: '4',
    id: '1978921795',
    name: '云音乐电音榜'
  },
  {
    idx: '5',
    id: '180106',
    name: 'UK排行榜周榜'
  },
  {
    idx: '6',
    id: '60198',
    name: '美国Billboard周榜'
  },
  {
    idx: '7',
    id: '21845217',
    name: 'KTV嗨榜'
  }, {
    idx: '8',
    id: '11641012',
    name: 'iTunes榜'
  },
  {
    idx: '9',
    id: '120001',
    name: 'Hit FM Top榜'
  }, {
    idx: '10',
    id: '60131',
    name: '日本Oricon周榜'
  }, {
    idx: '11',
    id: '',
    name: '韩国Melon排行榜周榜'
  }, {
    idx: '12',
    id: '',
    name: '韩国Mnet排行榜周榜'
  }, {
    idx: '13',
    id: '',
    name: '韩国Melon原声周榜'
  }, {
    idx: '14',
    id: '',
    name: '中国TOP排行榜(港台榜)'
  }, {
    idx: '15',
    id: '',
    name: '中国TOP排行榜(内地榜)'
  },
  {
    idx: '16',
    id: '10169002',
    name: '香港电台中文歌曲龙虎榜'
  },
  {
    idx: '17',
    id: '',
    name: '华语金曲榜'
  },
  {
    idx: '18',
    id: '',
    name: '中国嘻哈榜'
  },
  {
    idx: '19',
    id: '27135204',
    name: '法国 NRJ EuroHot 30周榜'
  },
  {
    idx: '20',
    id: '112463',
    name: '台湾Hito排行榜'
  },
  {
    idx: '21',
    id: '3812895',
    name: 'Beatport全球电子舞曲榜'
  },
  {
    idx: '22',
    id: '71385702',
    name: '云音乐ACG音乐榜'
  },
  {
    idx: '23',
    id: '991319590',
    name: '云音乐嘻哈榜'
  }
]
class TopListModel {
  @observable loading = false
  @observable topList = []
  @observable topListDetail = {}

  @action async getTopList () {
    try {
      this.loading = true
      const data = await utils.Seesions.toplist.Get('/detail')
      if (data.code === 200) {
        this.topList = data.list
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
<<<<<<< HEAD
        return utils.global.navigator.dispatch(NavigationActions.back())
=======
        // return utils.global.navigator.dispatch(NavigationActions.back())
>>>>>>> develop
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
