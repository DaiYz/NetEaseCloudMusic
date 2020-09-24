<<<<<<< HEAD
=======
import React from 'react'
>>>>>>> develop
import Account from './store.account'
import App from './store.app'

const StoreMaps = {
  account: new Account(),
  app: new App()
}

export default StoreMaps
<<<<<<< HEAD
=======

const storesContext = React.createContext(StoreMaps)
export const useStores = () => React.useContext(storesContext)
>>>>>>> develop
