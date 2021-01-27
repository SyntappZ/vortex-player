import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {Icon} from 'react-native-elements';

import {useSelector} from 'react-redux';
// import { TouchableOpacity } from "react-native-gesture-handler";
const Folder = ({folderName, tracks, folderPath, id, numberOfSongs}) => {
  const {lightBackground, folderColor, secondary} = useSelector(
    (state) => state.themeReducer.theme,
  );
 
    // <EntypoIcon name={'folder-music'} size={35} color="#074DD9" />
   
  

  const modalHandler = () => {};
  return (
    <View style={{...styles.container, backgroundColor: lightBackground}}>
      <View style={styles.iconWrap}>
      <Icon type="entypo" name="folder-music" size={35} color={secondary} />
      </View>
      <View style={styles.textWrap}>
        <TouchableOpacity style={styles.touchable} onPress={modalHandler}>
          <Text numberOfLines={1} style={styles.title}>
            {folderName}
          </Text>
          <Text numberOfLines={1} style={styles.storage}>
            {folderPath}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.moreWrap}>
        <TouchableOpacity style={styles.moreTouchable}>
          <Text numberOfLines={1} style={styles.songs}>
            songs: {numberOfSongs}
          </Text>
          <Icon size={30} name="more-vert" color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  iconWrap: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
  textWrap: {
    flex: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 35,
  },
  moreTouchable: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  moreWrap: {
    flex: 2,
  },

  songs: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    paddingRight: 15,
  },
  storage: {
    fontSize: 12,
    color: '#aaa',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 2,
  },
});

export default Folder;
