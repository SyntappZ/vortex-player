import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import AllActions from '../store/actions';
import TracksListView from '../components/TracksListView';
import {TouchableOpacity} from 'react-native-gesture-handler';
const AlbumPlaylistView = () => {
  const dispatch = useDispatch();
  const {selectedAlbum} = useSelector((state) => state.playerReducer);
  const {
    primary,
    background,
    lightBackground,
    extraLightBackground,
    secondary,
    border,
  } = useSelector((state) => state.themeReducer.theme);

  useEffect(() => {
    console.log(selectedAlbum);
    return () => {
      dispatch(AllActions.setSelectedAlbum({}));
    };
  }, [selectedAlbum]);

  return (
    <View style={{...styles.container, backgroundColor: extraLightBackground}}>
      <StatusBar backgroundColor={extraLightBackground} />
      <View style={styles.top}>
        <View style={styles.imageContainer}>
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

          <View style={{...styles.imageWrap, borderColor: '#eee'}}>
            <Image style={styles.image} source={{uri: selectedAlbum.cover}} />
          </View>
        </View>
        <View style={styles.infoContainer}></View>
      </View>
      <View style={{...styles.bottom, backgroundColor: background}}>
        <View style={{...styles.fab, backgroundColor: primary}}>
          <Icon type="entypo" name="shuffle" size={25} color={'white'} />
        </View>

        {/* <Text style={styles.text}>{selectedAlbum.tracks.length} tracks</Text> */}
        <TracksListView tracks={selectedAlbum.tracks} />
      </View>
    </View>
  );
};

const radius = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3,
    padding: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
  },
  infoContainer: {
    flex: 1,
    paddingBottom: 20,
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
  },
  imageWrap: {
    flex: 4,
    backgroundColor: 'red',
    // width: 180,
    // height: 180,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#fff',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
  },
  backButton: {
    flex: 2,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  backIcon: {
      padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  text: {
    textTransform: 'capitalize',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default AlbumPlaylistView;
