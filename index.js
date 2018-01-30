import { AppRegistry } from 'react-native';
import App from './src/App';
import Setup from './src/Setup';

Setup.init();

AppRegistry.registerComponent('SWDBrowser', () => App);
