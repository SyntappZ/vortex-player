import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Image, Dimensions } from 'react-native';
import CircleSlider from 'react-native-circle-slider';
import { useSelector, useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');
const radius = width / 2.8;
const CircleSliderContainer = () => {
  const { primary, background, secondary, subtext } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );

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
        <Image
          source={{ uri: currentPlayingTrack.cover }}
          style={styles.image}
        />
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
