import React from 'react';


import { Icon } from 'react-native-elements';
const Heart = ({ isFavorite, size }) => {
  return (
    <>
      {isFavorite ? (
        <Icon name="heart" type="antdesign" color="#ffffff" size={size} />
      ) : (
        <Icon name="hearto" type="antdesign" color="#ffffff" size={size} />
      )}
    </>
  );
};

export default Heart;
