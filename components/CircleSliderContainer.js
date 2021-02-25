import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import CircleSlider from 'react-native-circle-slider';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import vinal from '../images/lottie/spinning-vinyl.json';
const { width, height } = Dimensions.get('window');
const radius = height / 5.5;
const CircleSliderContainer = ({ playing }) => {
  const vinalAnimation = useRef(null);
  const { primary, background, secondary, subtext, vinalColor } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );

  const colorArray = Array(3)
    .fill('')
    .map((_, i) => {
      return {
        keypath: `Shape Layer ${i + 1}`,
        color: secondary,
      };
    });

  useEffect(() => {
    if (vinalAnimation.current) {
      if (playing) {
        vinalAnimation.current.resume();
      } else {
        vinalAnimation.current.pause();
      }
    }
  }, [playing]);

  return (
    <View style={styles.container}>
      <CircleSlider
        value={90}
        btnRadius={10}
        strokeWidth={5}
        textColor={secondary}
        meterColor={secondary}
        strokeColor={primary}
        dialRadius={radius}
      />
      <View style={{ ...styles.imageWrap }}>
        {currentPlayingTrack.cover ? (
          <Image
            source={{ uri: currentPlayingTrack.cover }}
            style={styles.image}
          />
        ) : (
          <LottieView
            ref={vinalAnimation}
            style={{ width: '100%' }}
            source={vinal}
            autoPlay={true}
            loop={true}
            speed={0.3}
            colorFilters={[
              {
                keypath: 'disk',
                color: vinalColor,
              },
              {
                keypath: 'disk 2',
                color: vinalColor,
              },
              {
                keypath: 'reflect',
                color: background,
              },
              {
                keypath: 'Shape Layer 2',
                color: background,
              },
            ]}
          />
        )}
      </View>
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

    position: 'absolute',
    zIndex: -1,
  },
  image: {
    width: imageRadius,
    height: imageRadius,
    borderRadius: imageRadius / 2,
  },
});

export default CircleSliderContainer;
