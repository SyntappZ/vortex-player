import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';
import Album from '../../components/Album';
// import { getMusicAlbums } from "../../store/functions/fetchMusic.js";
// import { fetchAlbumArt } from "../../functions/AlbumArtApi.js";

const renderItem = ({item}) => (
  <Album
    album={item.album}
    author={item.author}
    cover={item.cover}
    id={item.id}
    numberOfSongs={item.numberOfSongs}
  />
);

const getItemLayout = (data, index) => (
  {length: 240, offset: 240 * index, index}
)

const AlbumView = () => {
  const {albums} = useSelector((state) => state.globalReducer);

  useEffect(() => {
    // console.log(albums)
  }, [albums]);

  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => `item-id${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default AlbumView;
