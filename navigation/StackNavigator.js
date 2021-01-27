import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../views/splash/SplashScreen';
import SwipeNavigator from './SwipeNavigator';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FolderPlaylistView from '../views/FolderPlaylistView';
import AlbumPlaylistView from '../views/AlbumPlaylistView';
const Stack = createStackNavigator();


const StackNavigator = () => {
  const {background} = useSelector((state) => state.themeReducer.theme);
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Splash"
      mode="modal"
      screenOptions={{
        cardStyle: {backgroundColor: background},
        
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SwipeNavigator" component={SwipeNavigator} />
      <Stack.Screen name="FolderPlaylist" component={FolderPlaylistView} />
      <Stack.Screen name="AlbumPlaylist" component={AlbumPlaylistView} />
     
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
