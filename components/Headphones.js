import React from 'react';


import LottieView from 'lottie-react-native';
import headphones from '../images/lottie/headphones.json';
import {useSelector} from 'react-redux';
const Headphones = () => {
  const {primary} = useSelector(
    (state) => state.themeReducer.theme,
  );

  const grey = '#B6B6B6'

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
          color: grey,
        },
        {
          keypath: 'Cover Left',
          color: grey,
        },
        {
          keypath: 'Cover Right',
          color: grey,
        },
      ]}
    />
  );
};



export default Headphones;
