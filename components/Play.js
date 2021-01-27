import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import {useSelector} from 'react-redux'
import play from '../images/lottie/play.json';
import LottieView from 'lottie-react-native';

const Play = ({playing, color, size}) => {

  const animation = useRef(null)

  const layers = Array(11).fill(1).map((_, i) => ({
    keypath: `Shape Layer ${i + 1}`,
    color: color
  }))


  useEffect(() => {
    
    if(playing) {
      console.log('play')
      animation.current.play()
      setTimeout(() => {
      animation.current.pause()
      }, 3500)
      
     
    }else if(playing === false){
      console.log('stop')
      animation.current.resume()
      // setTimeout(() => {
      //   animation.current.reset()
      // }, 2500)
      
    }
    
  }, [playing])
  return (
    <LottieView
      ref={animation}
      style={{width: size}}
      source={play}
      autoPlay={false}
      loop={false}
      colorFilters={layers}
    />
  );
};

const styles = StyleSheet.create({
 
});

export default Play;
