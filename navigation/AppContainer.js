import React, { useEffect, useRef } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { requestPermission } from '../store/functions/askPermission.js';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import AllActions from '../store/actions';
import BottomPlayer from '../components/BottomPlayer';

const AppContainer = () => {
  const dispatch = useDispatch();
  const { lightBackground, background } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { playerAlbumData } = useSelector((state) => state.playerReducer);
  const { appLoaded, tracks, albumData } = useSelector(
    (state) => state.globalReducer,
  );

  const getPermissions = async () => {
    const granted = await requestPermission();
    if (granted) {
      dispatch(AllActions.fetchAlbums());
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (playerAlbumData) {
  
      dispatch(AllActions.setCurrentTrack(tracks[0]));
    }
  }, [playerAlbumData]);

  useEffect(() => {
    if (Object.keys(albumData).length > 0) {
      dispatch(AllActions.setPlayerAlbumData(albumData));
    }
  }, [albumData]);
  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(AllActions.setPlayerTrackData(tracks));
    }
  }, [tracks]);

  const navigationRef = useRef(null);

  const MyTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: lightBackground,
    },
  };
  return (
    <View style={{ ...styles.container, backgroundColor: background }}>
      <StatusBar backgroundColor={background} />
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <StackNavigator />
        {appLoaded ? <BottomPlayer navigation={navigationRef.current} /> : null}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
