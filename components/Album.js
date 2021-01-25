import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {convertImageToBase64} from '../store/functions/converters.js';
import {Icon} from 'react-native-elements';
import { useSelector } from 'react-redux'
import useIsMounted from 'ismounted';
// import { TouchableOpacity } from "react-native-gesture-handler";

const Album = ({album, author, cover, id, numberOfSongs}) => {
  const isMounted = useIsMounted();
  const { primary } = useSelector(state => state.themeReducer.theme)
  const [albumCover, setAlbumCover] = useState(
    <ActivityIndicator size="large" color="#fff" />,
  );

  const modalHandler = () => {
    console.log(albumCover);
  };

  const fetchCoverArt = async () => {
    const convertedImage = await convertImageToBase64(cover);

    const imageContainer = (
      <Image style={styles.image} source={{uri: convertedImage}} />
    );
    setAlbumCover(imageContainer);
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchCoverArt();
    }
  }, []);

  return (
    <View style={styles.album}>
      <View style={styles.imageWrap}>
        <TouchableOpacity style={styles.touchable} onPress={modalHandler}>
          {albumCover}
        </TouchableOpacity>
      </View>
      <View style={{...styles.albumInfo, backgroundColor: primary}}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{color: 'white'}} numberOfLines={1}>
            {album}
          </Text>
          <Text style={{color: '#D3D3D3'}} numberOfLines={1}>
            songs: {numberOfSongs}
          </Text>
        </View>

        <View style={styles.more}>
          <Icon size={30} name="more-vert" color="#fff" />
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  album: {
    flex: 1,
    height: 230,
    margin: 5,
  },
  imageWrap: {
    flex: 5,
    backgroundColor: '#222',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '100%',
  },
  more: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  albumInfo: {
    flex: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
  },
});

export default Album;
