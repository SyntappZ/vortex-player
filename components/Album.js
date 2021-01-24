import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";


import useIsMounted from 'ismounted';
import { TouchableOpacity } from "react-native-gesture-handler";

const Album = ({ album, id, author, numberOfSongs }) => {
  const isMounted = useIsMounted();
  const [albumCover, setAlbumCover] = useState(<ActivityIndicator size="large" color="#fff" />);
  // <ActivityIndicator size="large" color="#fff" />

  const modalHandler = () => {
    console.log(albumCover)
  };

  const fetchCoverArt = async () => {
    const author = "";
    const uri = await fetchAlbumArt(author, album);
    if (uri) {
      
      const imageContainer = (
        <Image style={styles.image} source={{ uri: uri }} />
      );
      setAlbumCover(imageContainer);
    } else {
      setAlbumCover(<Text style={{ color: "#fff" }}>none</Text>);
    }
  };

  useEffect(() => {
    // fetchCoverArt();
    if (isMounted.current) {
      // console.log(id)
      // fetchCoverArt();
    }
    
  }, []);
  const image =
    "https://lastfm.freetls.fastly.net/i/u/174s/f07c48bca199461cbd9aac9ad969785d.png";
  const image2 = "https://flevix.com/wp-content/uploads/2019/07/Round-Line-Loading.gif";
  return (
    <View style={styles.album}>
      <View style={styles.imageWrap}>
        <TouchableOpacity style={styles.touchable} onPress={modalHandler}>
         {albumCover}
        </TouchableOpacity>
      </View>
      <View style={styles.albumInfo}>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={{ color: "white" }} numberOfLines={1}>
            {album}
          </Text>
          <Text style={{ color: "#D3D3D3" }} numberOfLines={1}>
            songs: {numberOfSongs}
          </Text>
        </View>

        <View style={styles.more}>
          {/* <IonIcon name="md-more" size={30} color="#fff" /> */}
        </View>
      </View>
    </View>
  );
};

const colorDarkGrey = "#222";
const colorBlue = "#2A56B9";

const styles = StyleSheet.create({
  album: {
    flex: 1,
    height: 230,
    margin: 5,
  },
  imageWrap: {
    flex: 5,
    backgroundColor: colorDarkGrey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    height: "100%",
  
  },
  more: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  albumInfo: {
    flex: 2,
    backgroundColor: colorBlue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    flexDirection: "row",
  },
});

export default Album;