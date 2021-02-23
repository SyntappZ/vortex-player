import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import ProgressBar from './ProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import TextTicker from 'react-native-text-ticker';
import AllActions from '../store/actions';
// import Play from './Play';

const BottomPlayer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(null);
  const [cover, setCover] = useState(null);
  const [track, setTrack] = useState({});
  const { background, primary } = useSelector(
    (state) => state.themeReducer.theme,
  );

  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );
  const { bottomPlayerPosition } = useSelector(
    (state) => state.globalReducer,
  );

  // useEffect(() => {
  //   if (albumData) {
  //     const id = currentPlayingTrack.albumId;

  //     setCover(albumData[id].cover);
  //   }
  // }, [albumData, currentPlayingTrack]);

  const modalHandler = () => {
    navigation.navigate('NowPlayingView');
    dispatch(AllActions.setPlayerVisibility(false));
  };
  const playerControls = () => {};

  const animationFinished = () => {};

  return (
    <View style={{ ...styles.container, backgroundColor: background, bottom: bottomPlayerPosition }}>
      <View style={styles.imageWrap}>
        
          <TouchableOpacity
            onPress={modalHandler}
            style={styles.touchableImage}>
            <Image
              source={{ uri: currentPlayingTrack.cover }}
              style={styles.image}
            />
          </TouchableOpacity>
       
      </View>
      <View style={styles.rightWrap}>
        <ProgressBar radius={10} color={primary} />
        <View style={styles.playerWrap}>
          <View style={styles.trackName}>
            <TouchableOpacity onPress={modalHandler} style={styles.touchable}>
              <View styles={styles.textWrap}>
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
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.touchableControl}
              onPress={() => playerControls('backwards')}>
              <Icon name="fast-rewind" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPlaying(!playing)}
              style={styles.touchableControl}>
              {/* <Play playing={playing} color={primary} size={55} /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => playerControls('forwards')}
              style={styles.touchableControl}>
              <Icon name="fast-forward" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 70,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',  
    bottom: 0,
  },
  imageWrap: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    // borderColor: 'grey',
    // borderRadius: 15,
    // borderWidth: 3,
  },

  image: {
    // borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  rightWrap: {
    flex: 5,
  },
  playerWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  touchableImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
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
  trackName: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    height: '100%',
  },

  controls: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableControl: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 75,
  },
});

export default BottomPlayer;

{
  /* <Modal
        animationType="slide"
        transparent={false}
        presentationStyle={'fullScreen'}
        hardwareAccelerated={true}
        visible={modalOpen}
        onRequestClose={() => {
          modalHandler();
        }}>
        <NowPlayingBig
          modalHandler={modalHandler}
          trackTitle={trackTitle}
          trackArtist={trackArtist}
          trackArt={trackArt}
          trackId={trackId}
          playerControls={playerControls}
          duration={duration}
          isShuffled={isShuffled}
          shuffleUpComingPlaylist={shuffleUpComingPlaylist}
          setFavorites={setFavorites}
          favorites={favorites}
          seconds={seconds}
          setRepeat={setRepeat}
          isRepeat={isRepeat}
        />
      </Modal> */
}

//   useEffect(() => {
//     if (afterFirstLoad) {
//       setAsyncStorage('lastTrack', {
//         title: trackTitle,
//         artist: trackArtist,
//         duration: duration,
//         artwork: trackArt,
//         id: trackId,
//       });
//     } else {
//       getAsyncStorage('lastTrack').then(track => {
//         setTrackArt(track.artwork);
//         setTrackTitle(track.title);
//         setId(track.id);
//         setArtist(track.artist);
//         setDuration(track.duration);
//       });
//     }
//   }, [trackId]);

//   useEffect(() => {
//     setIsFirstLoad(true);
//     let onTrackChange = TrackPlayer.addEventListener(
//       'playback-track-changed',
//       async data => {
//         try {
//           const track = await TrackPlayer.getTrack(data.nextTrack);

//           if (isMounted.current) {
//             if (track != null) {
//               if (track.artwork) {
//                 if (track.artwork !== trackArt) {
//                   setTrackArt(track.artwork);
//                 }
//               } else {
//                 setTrackArt(null);
//               }

//               setTrackTitle(track.title);
//               setArtist(track.artist);
//               setDuration(track.duration);
//               setId(track.id);
//               setSeconds(track.seconds);
//             }
//           }
//         } catch (error) {
//           console.log(error);
//         }

//         return () => {
//           isMounted.current = false;

//           onTrackChange.remove();
//         };
//       },
//     );

//   }, []);

// const playerControls = (control) => {
//   switch (control) {
//     case 'play':
//       TrackPlayer.play();
//       break;
//     case 'pause':
//       TrackPlayer.pause();
//       break;
//     case 'stop':
//       TrackPlayer.stop();
//       break;
//     case 'reset':
//       TrackPlayer.reset();
//       break;
//     case 'forwards':
//       TrackPlayer.skipToNext();
//       break;
//     case 'backwards':
//       TrackPlayer.skipToPrevious();
//   }
// };
