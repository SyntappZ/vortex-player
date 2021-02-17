import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';
import AllActions from '../../store/actions';
import AlbumListView from '../../components/AlbumListView';
import BottomSheetPlayer from '../../components/BottomSheetPlayer';

const AlbumView = ({navigation}) => {
  const {albums} = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const openAlbumPlaylist = (album) => {
    dispatch(AllActions.setSelectedAlbum(album));
    navigation.navigate('AlbumPlaylist');
  };

  return (
    <View style={styles.container}>
      <AlbumListView albums={albums} openAlbumPlaylist={openAlbumPlaylist} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AlbumView;
