import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import App from './screens/App';
import { cardDatabase } from './data';

cardDatabase.init();

export default function setup() {
  class AppContainer extends Component {
    componentDidMount() {
      setTimeout(() => {
        StatusBar.setBarStyle('light-content');
      }, 500);
    }

    render() {
      return <App />;
    }
  }

  return AppContainer;
}
