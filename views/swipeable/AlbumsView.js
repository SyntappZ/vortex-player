import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';

import AlbumListView from '../../components/AlbumListView';



const AlbumView = ({navigation}) => {
  const {albums} = useSelector((state) => state.globalReducer);

  const changeView = () => {
    navigation.navigate('AlbumPlaylist'); 
    
  };

  return (
    <View style={styles.container}>
      <AlbumListView albums={albums} changeView={changeView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AlbumView;
