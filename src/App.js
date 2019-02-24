import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import TabNavigator from './navigation/TabNavigator';


export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content');
    }, 500);
  }

  render() {
    return (
      <TabNavigator />
    );
  }
}
