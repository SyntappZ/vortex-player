import React, { useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar, View, StyleSheet,  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { requestPermission } from '../store/functions/askPermission.js';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import AllActions from '../store/actions';
import BottomSheetPlayer from '../components/BottomSheetPlayer';
import BottomPlayer from '../components/BottomPlayer';
import { setupPlayer } from 'react-native-track-player';
import BottomView from '../components/BottomView';
import NowPlayingView from "../views/NowPlayingView"
const AppContainer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { lightBackground, background } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { playerAlbumData, playerTracks } = useSelector((state) => state.playerReducer);
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
    setupPlayer();
  }, []);

  useEffect(() => {
    if(playerTracks) {
      dispatch(AllActions.setPlaylist(playerTracks, playerTracks[0]));
    }
    

    
  }, [playerTracks])



  

  useEffect(() => {
    if (Object.keys(albumData).length > 0) {
      dispatch(AllActions.setPlayerData(albumData, tracks));  
    }
  }, [albumData]);
 

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
      </NavigationContainer>
       <NowPlayingView setOpen={setOpen} open={open} />
      <BottomView setOpen={setOpen} open={open} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
 
});

export default AppContainer;
