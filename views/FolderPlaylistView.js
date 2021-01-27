import React from 'react'
import TextTicker from 'react-native-text-ticker';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
 const FolderPlaylistView = () => {
    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#062D83" animated={true} />

        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrap}>
              <EntypoIcon
                style={styles.backIcon}
                name={'folder-music'}
                size={70}
                color="#fff"
              />
            </View>
            <View style={styles.titleWrap}>
              <TextTicker
                style={styles.title}
                duration={15000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}>
                {name}
              </TextTicker>
            </View>
          </View>
          <View style={styles.information}>
            <View style={styles.backButton}>
              <TouchableOpacity style={styles.touchable}>
                <SimpleLineIcon
                  style={styles.backIcon}
                  name={'shuffle'}
                  size={20}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity
              
                style={styles.touchableRight}>
                <SimpleLineIcon
                  style={styles.backIcon}
                  name={'arrow-down'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.songs}>Songs: {tracksAmount}</Text>
              <View style={styles.timeWrap}>
                <Icon name="clock" size={12} color="#ccc" />
                <Text style={styles.totalTime}>{totalTime}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tracklist}>
         //tracks
        </View>
      </View>
    )
}


export default FolderPlaylistView

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
