import React from 'react'
import Account from './store.account'
import App from './store.app'

const StoreMaps = {
  account: new Account(),
  app: new App()
}

export default StoreMaps
const storesContext = React.createContext(StoreMaps)
export const useStores = () => React.useContext(storesContext)
