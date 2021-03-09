import React from 'react';
import Headphones from './Headphones';
import MusicFly from './MusicFly';

const HeadphonesImage = ({isPlaying, color, playAnimation}) => {
    return (
      <>
        {isPlaying ? <MusicFly color={'white'} /> : null}
        <Headphones playAnimation={playAnimation} color={color} />
      </>
    );
  };

  export default HeadphonesImage