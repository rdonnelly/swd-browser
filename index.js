import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';

import { name as appName } from './app.json';
import setup from './src/setup';

enableScreens();

AppRegistry.registerComponent(appName, setup);
