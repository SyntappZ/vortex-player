import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Heart from '../components/Heart';
import { useSelector, useDispatch } from 'react-redux';
import Gradient from '../components/Gradient';
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
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(null);

  const { primary, background, secondary, subtext, line } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData, isPlaying } = useSelector(
    (state) => state.playerReducer,
  );

  const modalHandler = () => {};
  const shuffleToggle = () => {};
  const storeFavorite = () => {};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(!open)}>
      <View style={{ ...styles.container, backgroundColor: background }}>
        <StatusBar backgroundColor={primary} animated={true} />
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
          <TouchableOpacity
            style={styles.lottieWrap}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Heart isFavorite={isFavorite} />
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.controlsContainer }}>
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              onPress={() => playerControls('shuffle')}
              style={styles.touchableControl}>
              <Icon name="shuffle" type="entypo" size={20} color={subtext} />
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
              onPress={() => playerControls('forwards')}
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
    </Modal>
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
