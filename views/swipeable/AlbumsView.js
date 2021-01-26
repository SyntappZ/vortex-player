import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, FlatList} from 'react-native';
import Album from '../../components/Album';
import AlbumListView from '../../components/AlbumListView';
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

const renderRow = (type, data) => {
  const {album, author, numberOfSongs, cover, id} = data.item;
  
  return (
    <View style={styles.containerGrid}>
      <Album
        album={album}
        author={author}
        cover={cover}
        id={id}
        numberOfSongs={numberOfSongs}
      />
    </View>
  );
};

const getItemLayout = (data, index) => ({
  length: 240,
  offset: 240 * index,
  index,
});

const AlbumView = () => {
  const {albums} = useSelector((state) => state.globalReducer);
  // const [albumList, setAlbumList] = useState([])

  // useEffect(() => {
  //   const convert = albums.map(item => {
  //     return {
  //       type: 'ALBUM',
  //       item: item
  //     }
  //   })
  //   setAlbumList(convert)
  // }, [albums]);

  return (
    <View style={styles.container}>
      <AlbumListView renderRow={renderRow} albums={albums} />
      {/* <FlatList
        data={albums}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => `item-id${item.id}`}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  containerGrid: {
    flex: 1,
    height: 'auto',
    paddingHorizontal: 10,
    // margin: 5,
  },
});

export default AlbumView;
