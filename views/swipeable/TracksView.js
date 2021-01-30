import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import TracksListView from '../../components/TracksListView';




const TracksView = () => {
  const {tracks} = useSelector((state) => state.globalReducer);

  return (
    <View style={styles.container}>
      <TracksListView
        tracks={tracks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TracksView;
