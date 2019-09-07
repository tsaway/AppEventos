//imports libraries/API's
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from './src/dependencias/Reducer';

//variables
let store = createStore(Reducer, applyMiddleware(ReduxThunk));

//imports screens
import Preload from './src/screens/Preload';
import Menu from './src/screens/Menu';

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
  }
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