
import Find from './find'
import Video from './video'
import VideoDetail from './video/VideoDetail'
import Mine from './mine'
import PlaylistDetail from './mine/PlaylistDetail'
import Friends from './friends'
import Account from './account'
import Login from './login'
import Loading from './load'
import { DjCateList, PayQuality } from './find/dj'
import { TopList, TopListDetail } from './find/toplist'
import MvTopList from './video/topList'
import AudioScreen from './audio'
export default {
  Find,
  Video,
  Mine,
  Friends,
  Account,
  Login,
  Loading,
  DjCateList,
  PayQuality,
  TopList,
  TopListDetail,
  VideoDetail,
  MvTopList,
  PlaylistDetail,
  AudioScreen
}
<<<<<<< HEAD
=======


export const stacks = [

  {
    name: 'Login',
    component: Login,
    options: { title: '登录' }
  },

  {
    name: 'Loading',
    component: Loading,
    options: { headerShown: false }
  },

  {
    name: 'DjCateList',
    component: DjCateList,
    options: { title: '电台分类' }
  },

  {
    name: 'PayQuality',
    component: PayQuality,
    options: { title: '付费精品' }
  },
  {
    name: 'TopList',
    component: TopList,
    options: { title: '排行榜' }
  },
  {
    name: 'TopListDetail',
    component: TopListDetail,
    options: { headerShown: false }
  },
  {
    name: 'VideoDetail',
    component: VideoDetail,
    options: { headerShown: false }
  },
  {
    name: 'MvTopList',
    component: MvTopList,
    options: { title: 'MV排行榜' }
  },
  {
    name: 'PlaylistDetail',
    component: PlaylistDetail,
    options: { headerShown: false }
  },
  {
    name: 'AudioScreen',
    component: AudioScreen,
    options: { headerShown: false }
  }
]
>>>>>>> develop
