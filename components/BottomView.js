import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { vw, vh } from 'react-native-viewport-units';
import { Icon } from 'react-native-elements';
// import Play from './Play';
import TextTicker from 'react-native-text-ticker';
import AllActions from '../store/actions';
const BottomView = ({ setOpen, open }) => {
  const { primary, background, bottomPlayer } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );
  const [playing, setPlaying] = useState(false);

  const playerControls = () => {};
  return (
    <View style={{ ...styles.container, backgroundColor: bottomPlayer }}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setOpen(!open)}>
        <View style={styles.imageWrap}>
        <Image
              source={{ uri: currentPlayingTrack.cover }}
              style={styles.image}
            />
        </View>
        <View style={styles.textWrap}>
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

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.touchableControl}
          onPress={() => playerControls('backwards')}>
          <Icon name="stepbackward" type="antdesign" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPlaying(!playing)}
          style={styles.touchablePlay}>
          <Icon name="play" type="font-awesome-5" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => playerControls('forwards')}
          style={styles.touchableControl}>
          <Icon name="stepforward" type="antdesign" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const imageSize = 55;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 90,
    paddingLeft: 20,
    paddingRight: 15,
  },

  imageContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'grey',
  },

  imageWrap: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    backgroundColor: 'green',
    marginRight: 10,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    
  },

  buttonsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  touchableControl: {
    padding: 15,
  },
  touchablePlay: {
    paddingLeft: 5,
  },

  textWrap: {
    flex:1,
    width: 30,
    // backgroundColor: 'red',
    height: 30,
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
});

export default BottomView;
