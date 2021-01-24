import React, { useEffect, useState } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import Album from "../../components/Album";
// import { getMusicAlbums } from "../../store/functions/fetchMusic.js";
// import { fetchAlbumArt } from "../../functions/AlbumArtApi.js";

const renderItem = ({ item }) => (
  <Album
    album={item.album}
    author={item.author}
    numberOfTracks={item.numberOfSongs}
    id={item.id}
  />
);

// const getItemLayout = (data, index) => (
//   {length: 230, offset: 230 * index, index}
// )

const AlbumView = () => {
  const [albums, setAlbums] = useState([]);


 
  return (
    <View style={styles.container}>
      <FlatList
        data={albums}
        renderItem={renderItem}
        // getItemLayout={getItemLayout}
        horizontal={false}
        numColumns={2}
      
        keyExtractor={(item) => `item-id${item.id}004`}
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



export default AlbumView