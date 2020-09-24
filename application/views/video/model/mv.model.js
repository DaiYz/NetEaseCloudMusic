import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import moment from 'moment'
<<<<<<< HEAD
import { NavigationActions } from 'react-navigation'
=======
>>>>>>> develop

class MvModel {
  @observable loading = false
  @observable loadMore = false
  @observable listHasMore = false
  @observable page = 0
  @observable updateTime = 0
  @observable mvList = []
  @observable topMvList = []
  @observable qualityMvList = []

  @action async getMoveList () {
    try {
      this.loading = true
      await this.geQualityList()
      await this.getTopMv(2)
      const resp = await utils.Seesions.mv.Get('/first')
      if (resp.code === 200) {
        this.mvList = resp.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @action async geQualityList () {
    try {
      const data = await utils.Seesions.personalized.Get('/mv')
      if (data.code === 200) {
        this.qualityMvList = data.result
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action async getTopMv (limit = 10, more = false) {
    try {
      if (more) {
        this.loadMore = true
      }
      const page = more ? this.page + 1 : 0
      const res = await utils.Seesions.top.Get(`/mv?limit=${limit}&offset=${page}&timestamp=${moment.now()}`)
      if (res.code === 200) {
        this.topMvList = more ? this.topMvList.slice().concat(res.data) : res.data
        this.listHasMore = res.hasMore
        this.page = page
        this.updateTime = res.updateTime
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loadMore = false
    }
  }
}

export default MvModel
