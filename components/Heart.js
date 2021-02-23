import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import heartLottie from '../images/lottie/heart-pop.json';
import { useSelector } from 'react-redux';
const Heart = ({ isFavorite }) => {
//   const { primary } = useSelector((state) => state.themeReducer.theme);
  const animation = useRef(null);
  useEffect(() => {
    if (isFavorite) {
      // console.log('play');
      animation.current.play();
      setTimeout(() => {
        animation.current.pause();
      }, 2000);
    } else if (isFavorite === false) {
      // console.log('stop');
      animation.current.resume();
     
    }
  }, [isFavorite]);
  return (
    <LottieView
      ref={animation}
      style={{ width: '100%' }}
      source={heartLottie}
      autoPlay={false}
      loop={false}
      speed={1.5}
    />
  );
};

export default Heart;
