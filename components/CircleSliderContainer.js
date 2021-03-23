import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import HeadphonesImage from '../components/HeadphonesImage';
import { useTrackPlayerProgress, seekTo } from 'react-native-track-player';
import CircularSlider from './CircularSlider';

const { width, height } = Dimensions.get('window');
const radius = height / 5.5;
const CircleSliderContainer = ({ isPlaying }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [panHandlerPressed, setPanHandlerPressed] = useState(false);
  const { position } = useTrackPlayerProgress(100, null);
  const { primary, background, secondary, subtext, vinalColor } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );

  const mapDuration = (number, in_min, in_max, out_min, out_max) => {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  const cover = currentPlayingTrack.artwork;

  const onPanChange = (pos) => {
    const skipToSeconds = mapDuration(
      pos,
      0,
      359,
      0,
      currentPlayingTrack.duration,
    );
    const seconds = Math.round(skipToSeconds);

    seekTo(seconds);
  };

  const changeValue = (val) => {
    setSliderValue(val);
  };

  const positionValue = mapDuration(
    position,
    0,
    currentPlayingTrack.duration,
    0,
    359,
  );

  useEffect(() => {
    let mounted = true;
    if (positionValue && !panHandlerPressed) {
      if (mounted) {
        setSliderValue(positionValue);
      }
    }
    return () => (mounted = false);
  }, [positionValue]);

  const isTouching = (touching) => {};

  const sliderRadius = radius * 2.4;

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrap}>
        <CircularSlider
          width={sliderRadius}
          height={sliderRadius}
          meterColor={secondary}
          strokeColor={primary}
          thumbSize={11}
          strokeWidth={5}
          panResponderReleased={onPanChange}
          value={sliderValue}
          onValueChange={changeValue}
          setPanHandlerPressed={setPanHandlerPressed}
        />
      </View>

      <View
        style={{
          ...styles.imageWrap,
          backgroundColor: vinalColor,
          padding: cover ? 0 : 40,
          paddingBottom: cover ? 0 : 50,
        }}>
        {cover ? (
          <Image source={{ uri: cover }} style={styles.image} />
        ) : (
          <HeadphonesImage
            isPlaying={isPlaying}
            color={secondary}
            playAnimation={false}
          />
        )}
      </View>
      {/* <TouchableOpacity
        onPress={changeTom}
        style={{
          backgroundColor: vinalColor,
          padding: 30,
        }}>
        <Text>press me</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const imageRadius = radius * 1.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrap: {
    //
    flex: 1,
    width: imageRadius,
    height: imageRadius,
    borderRadius: imageRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    zIndex: -1,
  },
  image: {
    width: imageRadius,
    height: imageRadius,
    borderRadius: imageRadius / 2,
  },
  sliderWrap: {
    transform: [{ rotate: '180deg' }],
  },
});

export default CircleSliderContainer;
