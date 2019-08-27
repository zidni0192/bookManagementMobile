import React from 'react'
import { StatusBar } from 'react-native'
import Navigator from './src/navigation/navigator'
import {Provider} from 'react-redux'
import store from './src/publics/redux/store'
const App = () => {
  return (
    <Provider store={store} >
      <Navigator />
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}></StatusBar>
    </Provider>
  )
}

export default App