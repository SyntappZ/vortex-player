import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import musicBars from '../images/lottie/bars.json';
import AllActions from '../store/actions';
import {playerControls} from '../store/functions/playerFunctions.js'
const FabButton = ({ fabHandler, newPlaylistId }) => {
  const dispatch = useDispatch();
  const {
    lightBackground,

    primary,
  } = useSelector((state) => state.themeReducer.theme);
  const { isPlaying, currentPlaylistId } = useSelector(
    (state) => state.playerReducer,
  );
  const [playAnimation, setPlayAnimation] = useState(false);
  const colorArray = Array(21)
    .fill('')
    .map((_, i) => {
      return {
        keypath: `形状图层 ${i}`,
        color: '#ffffff',
      };
    });

  useEffect(() => {
    if (isPlaying && currentPlaylistId === newPlaylistId) {
      setPlayAnimation(true);
    } else {
      setPlayAnimation(false);
    }
  }, [isPlaying, currentPlaylistId, newPlaylistId]);

  const playPlaylist = () => {
    if(playAnimation) {
      setPlayAnimation(false);
      playerControls('pause')
    }else{
      fabHandler()
    }
  }

  return (
    <View style={{ ...styles.fabWrap, backgroundColor: lightBackground }}>
      <TouchableOpacity
        onPress={playPlaylist}
        style={{
          ...styles.fab,
          backgroundColor: primary,
          paddingLeft: isPlaying ? null : 3,
        }}>
        {playAnimation ? (
          <LottieView
            style={{ width: '90%' }}
            source={musicBars}
            autoPlay={true}
            loop={true}
            colorFilters={colorArray}
          />
        ) : (
          <Icon name="play" type="font-awesome-5" color="#fff" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const radius = 40;

const styles = StyleSheet.create({
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
    bottom: -35,
    borderRadius: 50,
    right: radius,
    zIndex: 1000,
  },
});

export default FabButton;
