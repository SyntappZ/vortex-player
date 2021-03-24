import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import AllActions from '../../store/actions';
import AlbumListView from '../../components/AlbumListView';
import AlbumFavoriteListView from '../../components/AlbumFavoriteListView';
import BottomSheetPlayer from '../../components/BottomSheetPlayer';

const AlbumView = ({ navigation }) => {
  const { albums } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const openAlbumPlaylist = (album) => {
    dispatch(AllActions.setSelectedAlbum(album));
    navigation.navigate('AlbumPlaylist');
  };


  return (
    <View style={styles.container}>
      {albums.length > 0 ? <AlbumListView albums={albums} openAlbumPlaylist={openAlbumPlaylist} /> : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AlbumView;
