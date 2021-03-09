/**
 * @format
 */
import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import backgroundFunctions from './service.js'
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => backgroundFunctions);
// TrackPlayer.registerPlaybackService(() => require('./service.js'));
