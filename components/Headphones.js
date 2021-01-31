import React from 'react';


import LottieView from 'lottie-react-native';
import headphones from '../images/lottie/headphones.json';

const Headphones = ({color}) => {
  

  return (
    <LottieView
      style={{ width: '60%'}}
      source={headphones}
      autoPlay={false}
      progress={1}
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
          color: 'white',
        },
      ]}
    />
  );
};



export default Headphones;
