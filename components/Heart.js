import React from 'react';


import { Icon } from 'react-native-elements';
const Heart = ({ isFavorite, size, color }) => {

  const heartColor = color || 'white'
  return (
    <>
      {isFavorite ? (
        <Icon name="heart" type="antdesign" color={heartColor} size={size} />
      ) : (
        <Icon name="hearto" type="antdesign" color={heartColor} size={size} />
      )}
    </>
  );
};

export default Heart;
