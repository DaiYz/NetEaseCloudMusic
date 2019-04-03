import Stores from '../stores'
// import {  } from 'react-navigation'

type KeyMap = 'navigator' | 'toast'

class Global {
  navigator = null
  toast = null
  store = Stores

  set (key: KeyMap, value) {
    this[key] = value
  }

  link (key: KeyMap) {
    return (e) => { this[key] = e }
  }
}

export default Global
