import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import AllActions from '../store/actions';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstTrackLoaded } from '../store/actions/playerActions';
import TrackPlayer from 'react-native-track-player';

// import { skipToId,  } from "../store/functions/playerFunctions.js";
const colorBlack = '#0D0D0D';

const Track = ({
  artist,
  title,
  displayDuration,
  id,
  light,
  playlist,
  track,
  allTracks,
}) => {
  const dispatch = useDispatch();
  // const trackId = TrackPlayer.getCurrentTrack();
  const { primary, secondary, text, subtext, currentTrack } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { firstTrackLoaded, currentPlayingTrack } = useSelector(
    (state) => state.playerReducer,
  );
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const setPlaylist = async () => {
    // console.log(track)
    dispatch(AllActions.setPlaylist(playlist, track, allTracks));
  };

  const titleColor = light ? 'white' : text;

  // useEffect(() => {
  //   if (currentPlayingTrack) {
  //     setCurrentPlaying(currentPlayingTrack.id === id);
  //     console.log(currentPlayingTrack.id)
  //       console.log(id)

  //   }
  // }, [currentPlayingTrack.id]);

  const trackBackground = light ? currentTrack : '#fff';

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: currentPlaying ? trackBackground : null,
      }}>
      <View style={styles.iconWrap}>
        <Icon name="note" size={30} color={primary} type="entypo" />
      </View>

      <View style={styles.textWrap}>
        <TouchableOpacity style={styles.Touchable} onPress={setPlaylist}>
          <Text style={{ color: titleColor }} numberOfLines={1}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.artist, color: subtext }}>
            {artist}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.moreWrap}>
        <View style={styles.timeWrap}>
          <Text style={{ ...styles.trackTime, color: subtext }}>
            {displayDuration}
          </Text>

          <View>
            <Icon size={30} name="more-vert" color={titleColor} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    paddingRight: 15,
  },
  Touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textWrap: {
    flex: 4,
    justifyContent: 'center',
  },
  moreWrap: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  timeWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trackTime: {
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },

  artist: {
    fontSize: 12,

    paddingTop: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',

    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default Track;
