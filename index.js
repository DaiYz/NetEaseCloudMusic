/**
 * @format
<<<<<<< HEAD
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native'
import App from './application/index'
=======
 */

import { AppRegistry } from 'react-native'
import App from './application'
>>>>>>> develop
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
