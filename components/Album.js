import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import { vw, vh } from 'react-native-viewport-units';
import searchingLottie from '../images/lottie/search-location.json';
import Headphones from './Headphones';

const Album = ({
  albumName,
  author,
  cover,
  id,
  numberOfSongs,
  album,
  openAlbumPlaylist,
}) => {
  const searchImage = (
    <LottieView style={styles.lottie} source={searchingLottie} autoPlay loop />
  );

  const handleFavorites = () => {
    console.log(id)
  };

  const { primary, secondary, albumBackground } = useSelector((state) => state.themeReducer.theme);

  const grey = '#A2A2A2';

  return (
    <View style={styles.album}>
      <View style={{...styles.imageWrap, backgroundColor: albumBackground}}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => openAlbumPlaylist(album)}
        
          >
          {cover ? (
            <Image style={styles.image} source={{ uri: cover }} />
          ) : (
            <Headphones color={primary} waveColor={primary} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.albumInfo, backgroundColor: primary }}>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text style={{ color: 'white' }} numberOfLines={1}>
            {albumName}
          </Text>
          <Text style={{ color: '#D3D3D3' }} numberOfLines={1}>
            songs: {numberOfSongs}
          </Text>
        </View>

        <TouchableOpacity onPress={handleFavorites} style={styles.more}>
          <Icon type="font-awesome" name="heart-o" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const albumHeight = 32 * vh;

const styles = StyleSheet.create({
  album: {
    flex: 1,
    height: albumHeight,
    marginVertical: 10,
  },
  imageWrap: {
    flex: 5,
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10
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
  lottie: {
    width: '50%',
  },
});

export default Album;
