import React, { useEffect, useState, useCallback } from 'react';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';

import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';
import TextTicker from 'react-native-text-ticker';
import { totalTimeConverter } from '../store/functions/converters.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Headphones from '../components/Headphones';
import Play from '../components/Play';

const AlbumPlaylistView = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state) => state.playerReducer);
  const [tracks, setTracks] = useState([]);
  const {
    primary,
    background,
    lightBackground,
    extraLightBackground,
    secondary,
    border,
  } = useSelector((state) => state.themeReducer.theme);
  const [totalTime, setTotalTime] = useState(0.0);
  useEffect(() => {
    const time = totalTimeConverter(selectedAlbum.tracks);
    setTotalTime(time);
    return () => {
      // dispatch(AllActions.setSelectedAlbum({}));
    };
  }, [selectedAlbum]);

  const HeadphonesColor = '#494949'

  return (
    <View
      style={{ ...styles.container, backgroundColor: extraLightBackground }}>
      <StatusBar backgroundColor={extraLightBackground} />
      <View style={styles.top}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity>
            <Icon
              type="entypo"
              style={styles.backIcon}
              name="chevron-thin-left"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.albumDetailsContainer}>
          <View style={{ ...styles.imageWrap, borderColor: '#eee' }}>
            {selectedAlbum.cover ? (
              <Image
                style={styles.image}
                source={{ uri: selectedAlbum.cover }}
              />
            ) : (
              <Headphones color={HeadphonesColor}/>
            )}
          </View>
          <View style={styles.info}>
            <View style={styles.totalSongsWrap}>
              <Text style={styles.subtext}>Album</Text>
              <Icon
                type="entypo"
                name="dot-single"
                size={12}
                color="#888"
                iconStyle={{ paddingHorizontal: 2 }}
              />
              <Text style={styles.subtext}>
                {selectedAlbum.numberOfSongs} Songs
              </Text>
            </View>

            <TextTicker
              style={styles.title}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {selectedAlbum.album}
            </TextTicker>
            <Text style={styles.author}>{selectedAlbum.author}</Text>
            <View style={styles.totalTime}>
              <Icon name="clock" type="font-awesome-5" size={9} color="#888" />
              <Text style={styles.timeText}>{totalTime}</Text>
            </View>
            <View style={styles.shuffleButtonWrap}>
              <TouchableOpacity style={styles.shuffleButton}>
                <Icon type="entypo" name="shuffle" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ ...styles.bottom, backgroundColor: background }}>
        <View style={{...styles.fabWrap, backgroundColor: lightBackground}}>
          <TouchableOpacity style={{ ...styles.fab, backgroundColor: primary }}>
            <Play playing={null} size={50} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={styles.tracksContainer}>
          <TracksListView tracks={selectedAlbum.tracks} />
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
    height: 30,
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
    right: radius,
    borderRadius: 50,
    zIndex: 1000,
  },

  imageWrap: {
    borderRadius: 22,
    marginRight: 20,
    backgroundColor: '#333',
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
    color: '#888',
    textAlign: 'center',
    fontSize: 10,
    paddingLeft: 3,
  },
  subtext: {
    color: '#888',
    fontSize: 12,
    paddingVertical: 5,
  },
  author: {
    color: '#888',
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
    height: 15,
  },
  tracksContainer: {
    flex: 1,
  },
});

export default AlbumPlaylistView;
