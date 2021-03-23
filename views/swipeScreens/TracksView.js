import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TracksListView from '../../components/TracksListView';
import { Icon } from 'react-native-elements';
import FAB from 'react-native-fab';
import AllActions from '../../store/actions';
const TracksView = () => {
  const dispatch = useDispatch();

  const { tracks } = useSelector((state) => state.globalReducer);
  const { primary } = useSelector((state) => state.themeReducer.theme);
  const icon = <Icon type="entypo" name="shuffle" size={20} color={'white'} />;

  const handleShuffle = () => {
    dispatch(AllActions.handleShuffleAsync(tracks));
  };

  return (
    <View style={styles.container}>
      <TracksListView tracks={tracks} />
      {tracks.length > 1 ? (
        <FAB
          buttonColor={primary}
          snackOffset={90}
          iconTextColor={'white'}
          onClickAction={handleShuffle}
          iconTextComponent={icon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    bottom: 70,
    right: 0,
  },
});

export default TracksView;
