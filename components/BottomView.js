import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { vw, vh } from 'react-native-viewport-units';
import { Icon } from 'react-native-elements';
// import Play from './Play';
import TextTicker from 'react-native-text-ticker';
import AllActions from '../store/actions';
import HeadphonesImage from '../components/HeadphonesImage';
import {
  playerControls,
  setTrackFromId,
  loadPlaylist,
} from '../store/functions/playerFunctions.js';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {
  setCurrentPlaylist,
  setIsPlaying,
} from '../store/actions/playerActions';
import { getMusicTracks } from '../store/functions/fetchMusic';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const BottomView = ({ setOpen, open }) => {
  const dispatch = useDispatch();

  const { primary, background, bottomPlayer, secondary } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const {
    currentPlayingTrack,
    playerAlbumData,
    currentPlaylist,
    playerTracks,
    firstTrackLoaded,
    isPlaying,
  } = useSelector((state) => state.playerReducer);
  const { appLoaded } = useSelector((state) => state.globalReducer);

  const [cover, setCover] = useState(null);
  const [bottomPosition, setBottomPosition] = useState(-90);

  useEffect(() => {
    let mounted = true;
    TrackPlayer.updateOptions({
      stopWithApp: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });

    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async (data) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);

        if (!mounted) return;
        if (track) {
          dispatch(AllActions.setCurrentTrack(track));
        }
      },
    );

    return () => {
      mounted = false;
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (currentPlayingTrack.artwork) {
      setCover(
        <Image
          source={{ uri: currentPlayingTrack.artwork }}
          style={styles.image}
        />,
      );
    } else {
      setCover(<HeadphonesImage color={secondary} isPlaying={isPlaying} />);
    }
  }, [currentPlayingTrack.artwork]);

  useEffect(() => {
    if (appLoaded) {
      setBottomPosition(0);
    }
  }, [appLoaded]);

  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
  ];

  useTrackPlayerEvents(events, (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      const playing = event.state === STATE_PLAYING;
      dispatch(AllActions.setIsPlaying(playing));
    }
  });

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
            {currentPlayingTrack.artist}
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
          onPress={() => playerControls(isPlaying ? 'pause' : 'play')}
          style={styles.touchablePlay}>
          {isPlaying ? (
            <Icon name="pause" type="font-awesome-5" size={26} color="#fff" />
          ) : (
            <Icon name="play" type="font-awesome-5" size={26} color="#fff" />
          )}
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
