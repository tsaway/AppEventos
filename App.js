//imports libraries/API's
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

//imports files
import Reducers from './src/Reducers'

//variables
let store = createStore(Reducers, applyMiddleware(ReduxThunk))

//imports screens
import Preload from './src/screens/Preload'
import Menu from './src/screens/Menu'
import EventRegistration from './src/screens/registerEvent/EventRegistration'
import ReleasesTab from './src/screens/releases/ReleasesTab'
import QueryTab from './src/screens/query/QueryTab'
import SettingsTab from './src/screens/settings/SettingsTab'

const Browser = createStackNavigator({
  Preload: {
    screen: Preload,
    navigationOptions: {
      header: null
    }
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      header: null
    }
  },
  EventRegistration: {
    screen: EventRegistration,
    navigationOptions: {
      title: 'Cadastro do Evento',
      headerTitleStyle: {
        flex: 1,
        color: '#FFF'
      },
      headerStyle: {
        backgroundColor: '#414CCD'
      },
      headerBackImage: () => (
        <View>
          <Image
            source={require('./src/assets/images/icons/arrow/arrow-back3.png')}
            style={{ width: 16.2, height: 25.2 }}
          />
        </View>
      )
    }
  },
  ReleasesTab: {
    screen: ReleasesTab,
    navigationOptions: {
      title: 'Lançamentos',
      headerTitleStyle: {
        flex: 1,
        color: '#FFF'
      },
      headerStyle: {
        backgroundColor: '#414CCD'
      },
      headerBackImage: () => (
        <View>
          <Image
            source={require('./src/assets/images/icons/arrow/arrow-back3.png')}
            style={{ width: 16.2, height: 25.2 }}
          />
        </View>
      )
    }
  },
  QueryTab: {
    screen: QueryTab,
    navigationOptions: {
      title: 'Consultas',
      headerTitleStyle: {
        flex: 1,
        color: '#FFF'
      },
      headerStyle: {
        backgroundColor: '#414CCD'
      },
      headerBackImage: () => (
        <View>
          <Image
            source={require('./src/assets/images/icons/arrow/arrow-back3.png')}
            style={{ width: 16.2, height: 25.2 }}
          />
        </View>
      )
    }
  },
  SettingsTab: {
    screen: SettingsTab,
    navigationOptions: {
      title: 'Configurações',
      headerTitleStyle: {
        flex: 1,
        color: '#FFF'
      },
      headerStyle: {
        backgroundColor: '#414CCD'
      },
      headerBackImage: () => (
        <View>
          <Image
            source={require('./src/assets/images/icons/arrow/arrow-back3.png')}
            style={{ width: 16.2, height: 25.2 }}
          />
        </View>
      )
    }
  }
}, {
  // initialRouteName: 'EventRegistration'
})

const BrowserMain = createAppContainer(Browser)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserMain />
      </Provider>
    )
  }
}