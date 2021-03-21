import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';
import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';
import TextTicker from 'react-native-text-ticker';
import { totalTimeConverter } from '../store/functions/converters.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

import HeadphonesImage from '../components/HeadphonesImage';
import Heart from '../components/Heart';

import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import FabButton from '../components/FabButton';

// const screenWidth = Dimensions.get('window').width;
const FolderPlaylistView = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    lightBackground,
    extraLightBackground,
    folderColor,
    subtext,
    text,
    background,
    primary,
    secondary,
  } = useSelector((state) => state.themeReducer.theme);
  const [totalTime, setTotalTime] = useState(0.00);
  const [isFavorite, setIsFavorite] = useState(null);
  const [newPlaylistId, setNewPlaylistId] = useState(null);
  const { selectedFolder } = useSelector((state) => state.playerReducer);
  const { isPlaying } = useSelector((state) => state.playerReducer);
  useEffect(() => {
    const time = totalTimeConverter(selectedFolder.tracks);
    setTotalTime(time);
    if (selectedFolder.tracks.length > 0) {
      const id = selectedFolder.tracks.map((item) => item.id).join('');
      setNewPlaylistId(id);
    }
    return () => {
      // dispatch(AllActions.setSelectedFolder({}));
    };
  }, [selectedFolder]);

  const navigateBack = () => navigation.goBack();

  const favoriteHandler = () => {
    
  };

  const fabHandler = () => {
    const playlist = selectedFolder.tracks;
    dispatch(AllActions.setPlaylist(playlist, playlist[0]));
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: extraLightBackground }}>
      <StatusBar
        backgroundColor={extraLightBackground}
        barStyle={'dark-content'}
        animated={true}
      />
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
            onPress={favoriteHandler}>
            <Heart isFavorite={isFavorite} size={23} color={subtext} />
          </TouchableOpacity>
        </View>
        <View style={styles.albumDetailsContainer}>
          <View style={{ ...styles.imageWrap, backgroundColor: primary }}>
            <HeadphonesImage isPlaying={isPlaying} color={secondary} />
          </View>
          <View style={styles.info}>
            <View style={styles.totalSongsWrap}>
              <Text style={{ ...styles.subtext, color: subtext }}>Folder</Text>
              <Icon
                type="entypo"
                name="dot-single"
                size={12}
                color={subtext}
                iconStyle={{ paddingHorizontal: 2 }}
              />
              <Text style={{ ...styles.subtext, color: subtext }}>
                {selectedFolder.numberOfSongs} Songs
              </Text>
            </View>

            <TextTicker
              style={{ ...styles.title, color: text }}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {selectedFolder.folder}
            </TextTicker>
            <Text
              numberOfLines={1}
              style={{ ...styles.author, color: subtext }}>
              {selectedFolder.folderPath}
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
              <TouchableOpacity style={styles.shuffleButton}>
                <Icon type="entypo" name="shuffle" size={22} color={text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ ...styles.bottom, backgroundColor: background }}>
        <FabButton fabHandler={fabHandler} newPlaylistId={newPlaylistId} />

        <View style={styles.tracksContainer}>
          <TracksListView tracks={selectedFolder.tracks} light={true} />
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
  },

  bottom: {
    flex: 1,
    borderTopRightRadius: radius,
    paddingTop: 10,
    position: 'relative',
  },
  backButtonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumDetailsContainer: {
    flexDirection: 'row',
    paddingTop: 40,
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
    borderRadius: 50,
    right: radius,
    zIndex: 1000,
  },

  imageWrap: {
    borderRadius: 22,
    marginRight: 20,
    // backgroundColor: '#333',
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
  favoriteButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleWrap: {
    flex: 1,
    width: '100%',
  },

  title: {
    color: 'white',
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
    fontSize: 12,
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

export default FolderPlaylistView;
