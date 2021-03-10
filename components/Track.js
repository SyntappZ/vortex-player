import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import AllActions from "../store/actions"
import {Icon} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

const colorBlack = '#0D0D0D';

const Track = ({author, title, displayDuration, id, light, playlist, track}) => {
  const dispatch = useDispatch()
  const {primary, text, subtext} = useSelector((state) => state.themeReducer.theme);

  const setPlaylist = () => {
    dispatch(AllActions.setPlaylist(playlist, track))
  }

  const titleColor = light ? "white" : text

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <View style={styles.iconWrap}>
        <Icon name="note" size={30} color={primary} type="entypo" />
      </View>

      <View style={styles.textWrap}>
        <TouchableOpacity style={styles.Touchable} onPress={setPlaylist}>
          <Text style={{color: titleColor}} numberOfLines={1}>{title}</Text>
          <Text numberOfLines={1} style={{...styles.author, color: subtext}}>
            {author}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.moreWrap}>
        <View style={styles.timeWrap}>
          <Text style={{...styles.trackTime, color: subtext}}>{displayDuration}</Text>

          <View>
            <Icon size={30} name="more-vert" color={titleColor} />
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
   
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },

  author: {
    fontSize: 12,
   
    paddingTop: 1
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
   
    letterSpacing: 0.4,
    paddingBottom: 5,
  },
});

export default Track;
