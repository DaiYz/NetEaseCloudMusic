import { Platform } from 'react-native'
import axios from 'axios'
import Stores from '../stores'
const BaseUrl = Platform.OS === 'android' ? 'http://192.168.50.130:3000' : 'http://127.0.0.1:3000'
const SESSION_TIMEOUT = 10000

const instance = axios.create({
  timeout: SESSION_TIMEOUT
})
// REQUEST HANDLE
instance.interceptors.request.use((config) => {
  const authToken = Stores.account.authToken
  if (authToken) {
    config.headers.Authorization = authToken
  }
  config.headers['Cache-Control'] = 'no-cache'
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  const { config } = response
  const { url, method, headers } = config
  const _response = response || { data: null }
  return _response.data || {}
}, (err) => {
  console.log(err)
  try {
    if (err.config) {
      const { url = '', method = '' } = err.config
      const { data = {}, status = 0 } = err.response
      console.log(`[SESSION][${method.toUpperCase()}][${url}][${status}][${data}]`, err.response)
    } else {
      console.log(err)
    }
  } catch (e) {
    console.log(err)
  }
  return Promise.reject(err)
})

const sessionMethodBuild = (baseUrl) => {
  return {
    Post: async (path: string, body = {}) => {
      return await instance.post(`${baseUrl}${path}`, body)
    },

    Get: async (path: string, body = {}, params = {}) => {
      return await instance.get(`${baseUrl}${path}`, Object.assign({}, body, { params }))
    },

    Put: async (path: string, body = {}) => {
      return await instance.put(`${baseUrl}${path}`, body)
    },

    Delete: async (path: string, body = {}) => {
      return await instance.delete(`${baseUrl}${path}`, body)
    },

    Upload: async (path: string, body = {}) => {
      return await instance.post(`${baseUrl}${path}`, body, { timeout: 120000 })
    }
  }
}

export default {
  banner: sessionMethodBuild(`${BaseUrl}/banner`), // 轮播图
  top: sessionMethodBuild(`${BaseUrl}/top`), // 榜单
  search: sessionMethodBuild(`${BaseUrl}/search`), // 搜索
  dj: sessionMethodBuild(`${BaseUrl}/dj`), // 电台
  toplist: sessionMethodBuild(`${BaseUrl}/toplist`), // 榜单列表
  mv: sessionMethodBuild(`${BaseUrl}/mv`), // mv
  comment: sessionMethodBuild(`${BaseUrl}/comment`), // comment 评论
  simi: sessionMethodBuild(`${BaseUrl}/simi`), // 相似
  playlist: sessionMethodBuild(`${BaseUrl}/playlist`), // 歌单
  song: sessionMethodBuild(`${BaseUrl}/song`), // 歌单
  personalized: sessionMethodBuild(`${BaseUrl}/personalized`) // 个性化推荐
}
