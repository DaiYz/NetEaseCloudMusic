import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import moment from 'moment'
class PlaylistModel {
  @observable loading = false
  // @observable trackList = []
  @observable trackListId = []
  @observable playlistDetail = {}

  @action async getList (id) {
    try {
      this.loading = true
      const data = await utils.Seesions.playlist.Get(`/detail?id=${id}&timestamp=${moment.now()}`)
      if (data.code === 200) {
        this.playlistDetail = data.playlist
        // this.trackList = data.playlist.tracks
        // this.trackListId = data.playlist.trackIds
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @computed get trackList () {
    if (this.playlistDetail.hasOwnProperty('tracks')) {
      return [{ title: 'data', data: this.playlistDetail.tracks.slice() }]
    } else {
      return [{ title: 'data', data: [] }]
    }
  }
}

export default PlaylistModel
