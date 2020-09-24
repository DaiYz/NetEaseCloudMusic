import Stores from '../stores'
<<<<<<< HEAD
// import {  } from 'react-navigation'
=======
>>>>>>> develop

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
