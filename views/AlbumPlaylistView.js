import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';

import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';
import TextTicker from 'react-native-text-ticker';
import { totalTimeConverter } from '../store/functions/converters.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FabButton from '../components/FabButton';
import HeadphonesImage from '../components/HeadphonesImage';

const AlbumPlaylistView = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state) => state.playerReducer);
  const [tracks, setTracks] = useState([]);
  const {
    primary,
    background,
    lightBackground,
    extraLightBackground,
    secondary,
    subtext,
    text,
    border,
  } = useSelector((state) => state.themeReducer.theme);
  const { albumFavorites, nowPlayingOpen } = useSelector(
    (state) => state.globalReducer,
  );
  const [totalTime, setTotalTime] = useState(0.0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newPlaylistId, setNewPlaylistId] = useState(null);
  const [barStyle, setBarStyle] = useState('dark-content');
  useEffect(() => {
    const time = totalTimeConverter(selectedAlbum.tracks);
    setTotalTime(time);
    if (selectedAlbum.tracks.length > 0) {
      const id = selectedAlbum.tracks.map((item) => item.id).join('');
      setNewPlaylistId(id);
    }

    return () => {
      // dispatch(AllActions.setSelectedAlbum({}));
    };
  }, [selectedAlbum]);

  const handleFavorites = () => {
    dispatch(AllActions.addFavorite(selectedAlbum.id, 'album'));
  };

  const navigateBack = () => navigation.goBack();

  const handleShuffle = () => {
    const playlist = selectedAlbum.tracks;
    dispatch(AllActions.handleShuffleAsync(playlist));
  };

  const fabHandler = () => {
    const playlist = selectedAlbum.tracks;
    dispatch(AllActions.setPlaylist(playlist, playlist[0]));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsFavorite(albumFavorites.includes(selectedAlbum.id));
    }

    return () => (mounted = false);
  }, [albumFavorites.length, selectedAlbum.id]);

  const isModalOpen = (open) =>{
    dispatch(AllActions.setNowPlayingOpen(open));
  }

  useEffect(() => {
    isModalOpen(true);

    return () => {
      isModalOpen(false);
    };
  }, []);

  return (
    <View
      style={{ ...styles.container, backgroundColor: extraLightBackground }}>
      <StatusBar backgroundColor={extraLightBackground} barStyle={'dark-content'} animated={true} />

      <View style={styles.top}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={navigateBack}>
            <Icon
              type="entypo"
              style={styles.backIcon}
              name="chevron-thin-left"
              size={25}
              color={subtext}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavorites}>
            <Icon
              size={30}
              name="heart"
              type="entypo"
              color={isFavorite ? primary : subtext}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.albumDetailsContainer}>
          <View style={{ ...styles.imageWrap, backgroundColor: primary }}>
            {selectedAlbum.artwork ? (
              <Image
                style={styles.image}
                source={{ uri: selectedAlbum.artwork }}
                v
              />
            ) : (
              <HeadphonesImage isPlaying={false} color={secondary} />
            )}
          </View>
          <View style={styles.info}>
            <View style={styles.totalSongsWrap}>
              <Text style={{ ...styles.subtext, color: subtext }}>Album</Text>
              <Icon
                type="entypo"
                name="dot-single"
                size={12}
                color={subtext}
                iconStyle={{ paddingHorizontal: 2 }}
              />
              <Text style={{ ...styles.subtext, color: subtext }}>
                {selectedAlbum.numberOfSongs} Songs
              </Text>
            </View>

            <TextTicker
              style={{ ...styles.title, color: text }}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {selectedAlbum.album}
            </TextTicker>
            <Text style={{ ...styles.author, color: subtext }}>
              {selectedAlbum.author}
            </Text>
            <View style={styles.totalTime}>
              <Icon
                name="clock"
                type="font-awesome-5"
                size={9}
                color={subtext}
              />
              <Text style={{ ...styles.timeText, color: subtext }}>
                {totalTime}
              </Text>
            </View>
            <View style={styles.shuffleButtonWrap}>
              <TouchableOpacity
                style={styles.shuffleButton}
                onPress={handleShuffle}>
                <Icon type="entypo" name="shuffle" size={22} color={text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FabButton fabHandler={fabHandler} newPlaylistId={newPlaylistId} />
      </View>

      <View style={{ ...styles.bottom, backgroundColor: background }}>
        <View style={styles.tracksContainer}>
          <TracksListView tracks={selectedAlbum.tracks} light={true} />
        </View>
      </View>
    </View>
  );
};

const radius = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    padding: 20,
    position: 'relative',
  },

  bottom: {
    flex: 1,
    borderTopRightRadius: radius,
    paddingTop: 10,
    overflow: 'hidden',
  },
  backButtonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumDetailsContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },

  fab: {
    width: 70,
    height: 70,
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabWrap: {
    position: 'absolute',
    top: -35,
    right: radius,
    borderRadius: 50,
    zIndex: 1000,
  },

  imageWrap: {
    borderRadius: 22,
    marginRight: 20,

    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 22,
  },
  backButton: {
    flex: 2,
    alignItems: 'flex-start',
  },
  favoriteButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTopSpace: {
    flex: 2,
  },
  infoBottomSpace: {
    flex: 4,
    paddingHorizontal: 25,
  },
  info: {
    flex: 1,
  },
  backIcon: {
    paddingVertical: 10,
    paddingRight: 10,
  },

  titleWrap: {
    flex: 1,
    width: '100%',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  timeText: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: 10,
    paddingLeft: 3,
  },
  subtext: {
    fontSize: 12,
    paddingVertical: 5,
  },
  author: {
    fontSize: 15,
    paddingTop: 8,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 0.5,
  },
  shuffleButtonWrap: {
    position: 'absolute',
    bottom: 0,
  },
  shuffleButton: {
    paddingTop: 20,
    paddingRight: 20,
  },
  totalTime: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 10,
  },
  totalSongsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  tracksContainer: {
    flex: 1,
  },
});

export default AlbumPlaylistView;
