import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { vw, vh } from 'react-native-viewport-units';
import { Icon } from 'react-native-elements';
// import Play from './Play';
import TextTicker from 'react-native-text-ticker';
import AllActions from '../store/actions';
import HeadphonesImage from '../components/HeadphonesImage';

import TrackPlayer from 'react-native-track-player';
import { setCurrentPlaylist } from '../store/actions/playerActions';
const BottomView = ({ setOpen, open }) => {
  const { primary, background, bottomPlayer, secondary } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, playerAlbumData, currentPlaylist } = useSelector(
    (state) => state.playerReducer,
  );
  const { appLoaded } = useSelector((state) => state.globalReducer);
  const [playing, setPlaying] = useState(false);
  const [cover, setCover] = useState(null);
  const [bottomPosition, setBottomPosition] = useState(-90);
  const playerControls = () => {};

  const playlistConverter = (arr) => {
    return arr.map(item => ({
       id: item.id,
       album: item.album,
       artist: item.author,
       title: item.title,
       duration: item.duration,
       url: item.path,
       artwork: playerAlbumData[item.album].cover || "../images/defalutNote.jpg"
     }))
   }

   const loadTracks = async (playlist, track) => {
  
    if (playlist) {
      await TrackPlayer.add(playlist);
      await TrackPlayer.skip(track);
      TrackPlayer.play()
    }
  }

  useEffect(() => {
   
    if(currentPlayingTrack) {
      
      const playlist = playlistConverter(currentPlaylist)
      loadTracks(playlist, currentPlayingTrack.id)
    }
   
  }, [currentPlayingTrack])

  useEffect(() => {
    if (currentPlayingTrack.cover) {
      setCover(
        <Image
          source={{ uri: currentPlayingTrack.cover }}
          style={styles.image}
        />,
      );
    } else {
      setCover(<HeadphonesImage color={secondary} isPlaying={playing} />);
    }
  }, [currentPlayingTrack.cover]);

  useEffect(() => {
    if (appLoaded) {
      setBottomPosition(0);
    }
  }, [appLoaded]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: bottomPlayer,
        bottom: bottomPosition,
      }}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setOpen(!open)}>
        <View style={{ ...styles.imageWrap, backgroundColor: primary }}>
          {cover}
        </View>
        <View style={styles.textWrap}>
          <TextTicker
            style={styles.title}
            duration={15000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}>
            {currentPlayingTrack.title}
          </TextTicker>

          <Text numberOfLines={1} style={styles.artist}>
            {currentPlayingTrack.author}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.touchableControl}
          onPress={() => playerControls('backwards')}>
          <Icon name="stepbackward" type="antdesign" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPlaying(!playing)}
          style={styles.touchablePlay}>
          <Icon name="play" type="font-awesome-5" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => playerControls('forwards')}
          style={styles.touchableControl}>
          <Icon name="stepforward" type="antdesign" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const imageSize = 55;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    height: 90,
    paddingLeft: 20,
    paddingRight: 15,
  },

  imageContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  imageWrap: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 10,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },

  buttonsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  touchableControl: {
    padding: 15,
  },
  touchablePlay: {
    paddingLeft: 5,
  },

  textWrap: {
    flex: 1,
    width: 30,
    // backgroundColor: 'red',
    height: 30,
  },

  artist: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default BottomView;
