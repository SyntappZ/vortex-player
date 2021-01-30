import React, {useEffect, useState} from 'react';
import TextTicker from 'react-native-text-ticker';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import AllActions from '../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import {totalTimeConverter} from '../store/functions/converters.js'
const screenWidth = Dimensions.get('window').width;
const FolderPlaylistView = () => {
  const dispatch = useDispatch()
  const {lightBackground, folderColor, secondary} = useSelector(
    (state) => state.themeReducer.theme,
  );
  const [totalTime, setTotalTime] = useState(0.00)
  const {selectedFolder} = useSelector(state => state.playerReducer)
  const folderName = selectedFolder.folder
  const numberOfSongs = selectedFolder.numberOfSongs
 

  
  useEffect(() => {
    
    const time = totalTimeConverter(selectedFolder.tracks)
    setTotalTime(time)
    return () => {
       dispatch(AllActions.setSelectedFolder({}))
    }
}, [selectedFolder])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#062D83" animated={true} />

      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrap}>
            <Icon type="entypo" name="folder-music" size={35} color={'white'} />
          </View>
          <View style={styles.titleWrap}>
            <TextTicker
              style={styles.title}
              duration={15000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              {folderName}
            </TextTicker>
          </View>
        </View>
        <View style={styles.information}>
          <View style={styles.backButton}>
            <TouchableOpacity style={styles.touchable}>
              <Icon
                type="simple-line-icon"
                name="shuffle"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableRight}>
              <Icon
                type="simple-line-icon"
                name="arrow-down"
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoWrap}>
            <Text style={styles.songs}>Songs: {numberOfSongs}</Text>
            <View style={styles.timeWrap}>
              <Icon name="clock" type="font-awesome-5" size={12} color="#ccc" />
              <Text style={styles.totalTime}>{totalTime}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tracklist}></View>
    </View>
  );
};

export default FolderPlaylistView;

const colorLightBlack = '#131313';
const darkBlue = '#062D83';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
  },

  top: {
    flex: 1.2,
    backgroundColor: darkBlue,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  information: {
    flex: 1,
    backgroundColor: darkBlue,
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  titleWrap: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },

  infoWrap: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  imageWrap: {
    flex: 1,
  },

  fadeBorder: {
    flex: 1,
    width: 40,
    height: '100%',
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  songs: {
    fontSize: 12,
    color: '#eee',
    paddingTop: 7,
  },

  line: {
    width: '100%',
    height: 3,
    backgroundColor: 'white',
    flex: 4,
  },

  tracklist: {
    flex: 3,
    backgroundColor: colorLightBlack,
  },

  timeWrap: {
    flexDirection: 'row',
    height: 20,
    marginTop: 2,
    alignItems: 'center',
  },
  totalTime: {
    color: '#ccc',
    paddingLeft: 4,
    fontWeight: '100',
    fontSize: 12,
  },

  backButton: {
    flex: 1,
    flexDirection: 'row',
  },

  touchable: {
    flex: 1,
  },
  touchableRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backIcon: {
    padding: 20,
  },
});
