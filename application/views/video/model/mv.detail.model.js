import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import moment from 'moment'

class MvDetailModel {
  @observable mvUrl = ''
  @observable mvInfo = {}
  @observable mvId = ''
  @observable commentList = []
  @observable hotComments = []
  @observable commentsNum = 0
  @observable simiMv = []
  @observable loadMore = false
  @observable loading = false
  @observable listHasMore = false
  @observable hotHasMore = false
  @observable page = 0
  @observable showDesc = false

  @action.bound async loadData (id) {
    this.mvId = id
    try {
      this.loading = true
      await this.getMvInfo()
      await this.getMvUrl()
      await this.getSimiMv()
      await this.getCommentList()
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  @action.bound changeShow () {
    this.showDesc = !this.showDesc
  }

  @action async getMvInfo () {
    try {
      // const resp = await utils.Seesions.mv.Post('/detail', { mvid: this.mvId, timestamp: moment.now() })
      const resp = await utils.Seesions.mv.Get(`/detail?mvid=${this.mvId}&timestamp=${moment.now()}`)
      if (resp.code === 200) {
        this.mvInfo = resp.data
      }
      console.log(resp.data.id, 'info', this.mvId)
    } catch (e) {
      console.log(e)
    }
  }

  @action async getMvUrl () {
    try {
      // const resp = await utils.Seesions.mv.Post('/url', { id: this.mvId, timestamp: moment.now() })
      const resp = await utils.Seesions.mv.Get(`/url?id=${this.mvId}&timestamp=${moment.now()}`)

      if (resp.code === 200) {
        this.mvUrl = resp.data.url
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action async getSimiMv () {
    try {
      // const resp = await utils.Seesions.simi.Post('/mv', { mvid: this.mvId, timestamp: moment.now() })
      const resp = await utils.Seesions.simi.Get(`/mv?mvid=${this.mvId}&timestamp=${moment.now()}`)
      if (resp.code === 200) {
        this.simiMv = resp.mvs
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action async getCommentList (limit = 20, more = false) {
    try {
      if (more) {
        this.loadMore = true
      }
      const page = more ? this.page + 1 : 0
      const res = await utils.Seesions.comment.Get(`/mv?id=${this.mvId}&limit=${limit}&offset=${page}&timestamp=${moment.now()}`)
      if (res.code === 200) {
        this.hotHasMore = res.moreHot
        if (!more) {
          this.hotComments = res.hotComments
          this.commentsNum = res.total
        }
        this.commentList = more ? this.commentList.slice().concat(res.comments) : res.comments
        this.listHasMore = res.more
        this.page = page
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loadMore = false
    }
  }

  @computed get ActList () {
    let list = []
    const stickHeader = { type: 'stick' }
    list.push(stickHeader)
    const simi = { title: '相关推荐', data: this.simiMv, type: 'simi' }
    list.push(simi)
    const hot = { title: '精彩评论', data: this.hotComments, type: 'hot' }
    list.push(hot)
    const comment = { title: '最新评论', data: this.commentList, type: 'comment' }
    list.push(comment)
    return list.slice()
  }
}

export default MvDetailModel
