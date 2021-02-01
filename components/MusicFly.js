import React from 'react';

import LottieView from 'lottie-react-native';
import musicBars from '../images/lottie/music-fly.json';

const MusicFly = ({ color }) => {
  return (
    <LottieView
      style={{ width: '80%', position: 'absolute' }}
      source={musicBars}
      autoPlay={true}
      loop={true}
    />
  );
};

export default MusicFly;
