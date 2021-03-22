import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import AllActions from '../store/actions';

const Folder = ({
  folderName,
  tracks,
  folderPath,
  id,
  numberOfSongs,
  folder,
  openFolderPlaylist,
}) => {
  const { lightBackground, primary, secondary, subtext, text } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { folderFavorites } = useSelector((state) => state.globalReducer);

  const handleFavorites = () => {
    dispatch(AllActions.addFavorite(id, 'folder'));
  };

  useEffect(() => {
    setIsFavorite(folderFavorites.includes(id));
  }, [folderFavorites.length, id]);
  return (
    <View style={{ ...styles.container, backgroundColor: lightBackground }}>
      <View style={styles.iconWrap}>
        <Icon type="entypo" name="folder-music" size={35} color={primary} />
      </View>
      <View style={styles.textWrap}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => openFolderPlaylist(folder)}>
          <Text numberOfLines={1} style={{ ...styles.title, color: text }}>
            {folderName}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.storage, color: subtext }}>
            {folderPath}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.moreWrap}>
        <TouchableOpacity
          style={styles.moreTouchable}
          onPress={handleFavorites}>
          <Text numberOfLines={1} style={{ ...styles.songs, color: subtext }}>
            songs: {numberOfSongs}
          </Text>
          <View>
            <Icon
              size={18}
              name="heart"
              type="antdesign"
              color={isFavorite ? secondary : subtext}
            />
          </View>
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

    textAlign: 'right',
    paddingRight: 15,
  },
  storage: {
    color: '#aaa',
  },
  title: {
    fontSize: 14,

    letterSpacing: 0.4,
    paddingBottom: 2,
  },
});

export default Folder;
