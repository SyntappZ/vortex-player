import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {StatusBar, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {requestPermission} from '../store/functions/askPermission.js';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import AllActions from '../store/actions';
import BottomPlayer from '../components/BottomPlayer';

const AppContainer = () => {
  const dispatch = useDispatch();
  const {lightBackground, background} = useSelector(
    (state) => state.themeReducer.theme,
  );
  const {appLoaded} = useSelector((state) => state.globalReducer);

  const getPermissions = async () => {
    const granted = await requestPermission();
    if (granted) {
      dispatch(AllActions.fetchAlbums());
      // dispatch(AllActions.fetchTracks());
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: lightBackground,
    },
  };
  return (
    <View style={{...styles.container, backgroundColor: background}}>
      <StatusBar backgroundColor={background} />
      <NavigationContainer theme={MyTheme}>
        <StackNavigator />
        {appLoaded ? <BottomPlayer /> : null}
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
