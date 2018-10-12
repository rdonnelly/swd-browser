import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';
import Setup from './src/Setup';

Setup.init();

AppRegistry.registerComponent(appName, () => App);
