import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import moment from 'moment'
class PlaylistModel {
  @observable loading = false
  // @observable trackList = []
  @observable trackListId = []
  @observable playlistDetail = {}
  @observable audioUrlList = []
  @action async getList (id) {
    try {
      this.loading = true
      const data = await utils.Seesions.playlist.Get(`/detail?id=${id}&timestamp=${moment.now()}`)
      if (data.code === 200) {
        this.playlistDetail = data.playlist
        await this.getAudioUrl(data.playlist.trackIds)
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @action async getAudioUrl (ids) {
    try {
      let target = ids.map((item) => item.id).join(',')
      const data = await utils.Seesions.song.Get(`/url?id=${target}&timestamp=${moment.now()}`)
      if (data.code === 200) {
        this.audioUrlList = data.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  @computed get trackList () {
    if (this.playlistDetail.hasOwnProperty('tracks') && this.audioUrlList.length > 0) {
      let target = this.playlistDetail.tracks.map((item) => {
        item.urlDetail = this.audioUrlList.filter((val) => val.id === item.id)[0]
        return item
      }
      )
      return [{ title: 'data', data: target.slice() }]
    } else {
      return [{ title: 'data', data: [] }]
    }
  }
}

export default PlaylistModel
