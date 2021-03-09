import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import CircleSlider from 'react-native-circle-slider';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
// import vinal from '../images/lottie/spinning-vinyl.json';
import HeadphonesImage from '../components/HeadphonesImage';

const { width, height } = Dimensions.get('window');
const radius = height / 5.5;
const CircleSliderContainer = ({ isPlaying }) => {

  const { primary, background, secondary, subtext, vinalColor } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );

 const cover = currentPlayingTrack.cover

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
      <View style={{ ...styles.imageWrap, backgroundColor: vinalColor, padding: cover ? 0 : 40, paddingBottom: cover ? 0 : 50, }}>
        {cover ? (
          <Image
            source={{ uri: cover }}
            style={styles.image}
          />
        ) : (
        
          <HeadphonesImage isPlaying={isPlaying} color={secondary} playAnimation={false} />
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
    justifyContent: "center",
    alignItems: "center",
    
    

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
