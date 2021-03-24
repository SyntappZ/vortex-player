import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import TracksListView from '../components/TracksListView';

import Heart from '../components/Heart';
import { useSelector, useDispatch } from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AllActions from '../store/actions';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import dancingNote from '../images/lottie/dancing-note.json';
import wave from '../images/lottie/wave.json';
import CircleSliderContainer from '../components/CircleSliderContainer';
import {
  playerControls,
  setTrackFromId,
  loadPlaylist,
} from '../store/functions/playerFunctions.js';
const NowPlayingView = ({ open, setOpen }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(!open)}>
      <NowPlaying />
    </Modal>
  );
};

const NowPlaying = () => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const { primary, background, secondary, subtext, line } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const {
    currentPlayingTrack,
    albumData,
    isPlaying,
    currentPlaylist,
    cleanPlaylist,
    tracksViewPlaylist,
    isShuffleOn,
  } = useSelector((state) => state.playerReducer);
  const { favorites } = useSelector((state) => state.globalReducer);

  const modalHandler = () => {};
  const handleShuffle = () => {
    if (isShuffleOn) {
      dispatch(AllActions.setPlaylist(cleanPlaylist, currentPlayingTrack));
    } else {
      dispatch(
        AllActions.handleShuffleAsync(currentPlaylist, currentPlayingTrack),
      );
    }
  };
  const addFavorite = () => {
    const { id } = currentPlayingTrack;
    dispatch(AllActions.addFavorite(id, 'track'));
  };

 


  useEffect(() => {
    let mounted = true;
    
    if (mounted) {
      const { id } = currentPlayingTrack;
      const ids = favorites.map((track) => track.id);
      setIsFavorite(ids.includes(id));
    }

    return () => {
      mounted = false;
     
    };
  }, [favorites.length, currentPlayingTrack]);
  const sheetRef = useRef(null);
  const snapPoint = windowHeight + 20;

  const renderContent = () => (
    <View
      style={{
        backgroundColor: primary,

        height: snapPoint,
        // opacity: .8,
      }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          Current Playlist
        </Text>
      </View>

      <View style={styles.tracksContainer}>
        {tracksViewPlaylist.length > 0 ? (
          <TracksListView
            tracks={tracksViewPlaylist}
            light={true}
            nowPlayingView={true}
          />
        ) : null}
      </View>
      <View style={{ ...styles.buttonContainer, backgroundColor: primary }}>
        <Pressable
          style={{ padding: 10 }}
          onPress={() => sheetRef.current.snapTo(1)}>
          <Icon name="chevron-thin-down" type="entypo" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
     
      <View style={{ ...styles.container, backgroundColor: background }}>
      <StatusBar
        backgroundColor={primary}
        
        animated={true}/>
        <View style={{ ...styles.nowPlaying, backgroundColor: primary }}>
          <Text style={styles.nowPlayingText}>Now Playing</Text>
        </View>
        <View style={{ ...styles.titleContainer }}>
          <Text numberOfLines={1} style={{ ...styles.author, color: 'white' }}>
            {currentPlayingTrack.artist}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.title, color: subtext }}>
            {currentPlayingTrack.title}
          </Text>
        </View>
        <View style={{ ...styles.imageContainer }}>
          <CircleSliderContainer isPlaying={isPlaying} />
        </View>

        <View style={{ ...styles.favoriteContainer }}>
          <TouchableOpacity style={styles.lottieWrap} onPress={addFavorite}>
            <Heart isFavorite={isFavorite} size={28} />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.controlsContainer }}>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              onPress={handleShuffle}
              style={styles.touchableControl}>
              <Icon
                name="shuffle"
                type="entypo"
                size={20}
                color={isShuffleOn ? 'white' : subtext}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableControl}
              onPress={() => playerControls('backwards')}>
              <Icon
                name="stepbackward"
                type="antdesign"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => playerControls(isPlaying ? 'pause' : 'play')}
              style={{
                ...styles.touchablePlay,
                backgroundColor: secondary,
                paddingLeft: isPlaying ? 0 : 5,
              }}>
              {isPlaying ? (
                <Icon
                  name="pause"
                  type="font-awesome-5"
                  size={28}
                  color="#fff"
                />
              ) : (
                <Icon
                  name="play"
                  type="font-awesome-5"
                  size={28}
                  color="#fff"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => playerControls('forwards')}
              style={styles.touchableControl}>
              <Icon
                name="stepforward"
                type="antdesign"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sheetRef.current.snapTo(0)}
              style={styles.touchableControl}>
              <Icon
                name="playlist-music"
                type="material-community"
                size={22}
                color={subtext}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.lottieContainer }}>
          {isPlaying ? (
            <LottieView
              style={{ width: '100%' }}
              source={wave}
              autoPlay={true}
              loop={true}
              colorFilters={[
                { keypath: 'wave', color: secondary },
                { keypath: 'Shape Layer 1', color: secondary },
              ]}
            />
          ) : (
            <View style={{ ...styles.line, backgroundColor: line }}></View>
          )}
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[snapPoint, 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={1}
      />
    </>
  );
};

const buttonSize = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nowPlaying: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  nowPlayingText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 50,
  },
  author: {
    fontSize: 22,
  },
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 50,
    // backgroundColor: "yellow"
  },
  tracksContainer: {
    flex: 1,
  },

  lottieWrap: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  controlsContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablePlay: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: buttonSize / 2,
  },
  touchableControl: {
    padding: 10,
  },
  lottieContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "purple",
    paddingHorizontal: 50,
  },
  line: {
    width: '100%',
    height: 1,
  },
});

export default NowPlayingView;
