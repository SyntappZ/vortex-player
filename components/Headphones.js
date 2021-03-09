import React from 'react';


import LottieView from 'lottie-react-native';
import headphones from '../images/lottie/headphones.json';

const Headphones = ({color, playAnimation, waveColor}) => {
  

  return (
    <LottieView
      style={{ width: '60%'}}
      source={headphones}
      autoPlay={playAnimation}
      progress={1}
      speed={2}
      loop={false}
      colorFilters={[
        {
          keypath: 'Head',
          color: color,
        },
        {
          keypath: 'Cover Left',
          color: color,
        },
        {
          keypath: 'Cover Right',
          color: color,
        },
        {
          keypath: 'soundwave_1 Outlines 2',
          color: waveColor || 'white',
        },
      ]}
    />
  );
};



export default Headphones;
