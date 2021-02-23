import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import SwipeHeader from '../components/SwipeHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AlbumsView from '../views/swipeScreens/AlbumsView'
import FoldersView from '../views/swipeScreens/FoldersView'
import TracksView from '../views/swipeScreens/TracksView'
import FavoritesView from '../views/swipeScreens/FavoritesView'
import {useSelector} from 'react-redux'
import { vw, vh } from 'react-native-viewport-units';

const Tab = createMaterialTopTabNavigator();
const SwipeNavigator = () => {
const labelFontSize = 3 * vw;

  const {background, lightBackground, primary, secondary} = useSelector(state => state.themeReducer.theme)
  const options = {
    activeTintColor: secondary,
    inactiveTintColor: 'white',
    labelStyle: {
      textTransform: 'capitalize',
      fontSize: labelFontSize
    },
    style: {
      backgroundColor: background,
    },
    indicatorStyle: {
      backgroundColor: secondary,
    },
  };


  return (
    <View style={styles.container}>
      <SwipeHeader />
      <View style={styles.screens}>
        <Tab.Navigator initialLayout={{width: Dimensions.get('window').width}} tabBarOptions={options} >
          <Tab.Screen name="Albums" component={AlbumsView} />
          <Tab.Screen name="Folders" component={FoldersView} />
          <Tab.Screen name="Tracks" component={TracksView} />
          <Tab.Screen name="Favorites" component={FavoritesView} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screens: {
    flex: 8,
  },
});

export default SwipeNavigator;
