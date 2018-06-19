import React from 'react';
import { StatusBar } from 'react-native';

import MainTabNavigator from './navigation/MainTabNavigator';

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content');
    }, 500);
  }

  render() {
    return (
      <MainTabNavigator />
    );
  }
}
