//imports libraries/API's
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducers';

//variables
let store = createStore(Reducers, applyMiddleware(ReduxThunk));

//imports screens
import Preload from './src/screens/Preload';
import Menu from './src/screens/Menu';
import EventRegistration from './src/screens/registerEvent/EventRegistration';
import ReleasesTab from './src/screens/releases/ReleasesTab';
import ConsultationsTab from './src/screens/consultations/ConsultationsTab';
import SettingsTab from './src/screens/settings/SettingsTab';

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
      title: 'Cadastro do Evento'
    }
  },
  ReleasesTab: {
    screen: ReleasesTab,
    navigationOptions: {
      title: 'Lançamentos'
    }
  },
  ConsultationsTab: {
    screen: ConsultationsTab,
    navigationOptions: {
      title: 'Consultas'
    }
  },
  SettingsTab: {
    screen: SettingsTab,
    navigationOptions: {
      title: 'Configurações'
    }
  }
}, {
  initialRouteName: 'Menu'
});

const BrowserMain = createAppContainer(Browser);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserMain />
      </Provider>
    );
  }
}