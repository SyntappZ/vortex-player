import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import useIsMounted from 'ismounted';
const colorBlack = '#0D0D0D';

const Track = ({author, title, displayDuration, id}) => {
  const {primary} = useSelector((state) => state.themeReducer.theme);

  const getPlaylist = () => {};

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View style={styles.iconWrap}>
        <Icon name="note" size={30} color={primary} type="entypo" />
      </View>

      <View style={styles.textWrap}>
        <TouchableOpacity style={styles.Touchable} onPress={getPlaylist}>
          <Text numberOfLines={1}>{title}</Text>
          <Text numberOfLines={1} style={styles.author}>
            {author}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.moreWrap}>
        <View style={styles.timeWrap}>
          <Text style={styles.trackTime}>{displayDuration}</Text>

          <View>
            <Icon size={30} name="more-vert" color="#fff" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 70,
    paddingRight: 15,
  },
  Touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textWrap: {
    flex: 4,
    justifyContent: 'center',
  
  },
  moreWrap: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  timeWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trackTime: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },

  author: {
    fontSize: 12,
    color: '#aaa',
    paddingTop: 1
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default Track;
