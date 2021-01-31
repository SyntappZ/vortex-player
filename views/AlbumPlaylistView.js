import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';
import TextTicker from 'react-native-text-ticker';
import { totalTimeConverter } from '../store/functions/converters.js';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Headphones from '../components/Headphones';
import Play from '../components/Play';
const AlbumPlaylistView = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state) => state.playerReducer);
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
    console.log(selectedAlbum);
    const time = totalTimeConverter(selectedAlbum.tracks);
    setTotalTime(time);
    return () => {
      // dispatch(AllActions.setSelectedAlbum({}));
    };
  }, [selectedAlbum]);

  const dot = (
    <Icon
      type="entypo"
      name="dot-single"
      size={12}
      color="#888"
      iconStyle={{ paddingHorizontal: 2 }}
    />
  );
  const timeIcon = (
    <View style={styles.totalTime}>
      <Icon name="clock" type="font-awesome-5" size={9} color="#888" />
      <Text style={styles.timeText}>{totalTime}</Text>
    </View>
  );

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
          <View style={styles.details}>
            <View style={{ ...styles.imageWrap, borderColor: '#eee' }}>
              {selectedAlbum.cover ? (
                <Image
                  style={styles.image}
                  source={{ uri: selectedAlbum.cover }}
                />
              ) : (
                <Headphones />
              )}
            </View>
            <View style={styles.info}>
              <View style={styles.totalSongsWrap}>
                <Text style={styles.subtext}>Album</Text>
                {dot}
                <Text style={styles.subtext}>
                  {selectedAlbum.numberOfSongs} Songs
                </Text>
                {dot}
                {timeIcon}
              </View>
              {/* <Text style={styles.subtext}>
                Album {dot} {selectedAlbum.numberOfSongs} Songs {dot} Playing
              </Text> */}

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
              <TouchableOpacity style={styles.shuffleButton}>
                <Icon type="entypo" name="shuffle" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ ...styles.bottom, backgroundColor: background }}>
        <View style={{ ...styles.fab, backgroundColor: primary }}>
          {/* <Icon type="entypo" name="shuffle" size={25} color={'white'} /> */}
          <Play playing={null} size={50} color={'white'} />
        </View>

        {/* <Text style={styles.text}>{selectedAlbum.tracks.length} tracks</Text> */}
        <TracksListView tracks={selectedAlbum.tracks} />
      </View>
    </View>
  );
};

{
  /* <View style={styles.imageContainer}>
<View style={styles.backButton}>
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

<View style={{ ...styles.imageWrap, borderColor: '#eee' }}>
  <Image style={styles.image} source={{ uri: selectedAlbum.cover }} />
</View>
</View>
<View style={styles.infoContainer}>

<View style={styles.infoBottomSpace}>
  <View style={styles.info}>
    <Text style={styles.subtext}>
      Album {dot} {selectedAlbum.numberOfSongs} Songs {dot} {totalTime}
    </Text>
  </View>
</View>
</View> */
}

const radius = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumDetailsContainer: {
    flex: 3,

    position: 'relative',
  },
  top: {
    flex: 3,
    padding: 20,
  },

  bottom: {
    flex: 6,
    borderTopRightRadius: radius,
    paddingTop: 10,
    position: 'relative',
  },
  fab: {
    width: 70,
    height: 70,
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -35,
    right: radius,
    zIndex: 100,
  },
  details: {
    height: 150,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    // backgroundColor: '#555'
  },

  imageWrap: {
    borderRadius: 22,
    marginRight: 20,
    // borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: { width: 4, height: 4 },
    // shadowColor: 'white',
    // shadowOpacity: 1.0,
    // elevation: 3,

    // backgroundColor: '#0000', // invisible color
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
    fontSize: 12,
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
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 1,
    letterSpacing: 0.5,
  },
  shuffleButton: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingRight: 20,
  },
  totalTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalSongsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
  },
});

export default AlbumPlaylistView;
