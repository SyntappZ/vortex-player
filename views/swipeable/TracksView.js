import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import TracksListView from '../../components/TracksListView';
import {convertListView} from '../../store/functions/converters.js';



const TracksView = () => {
  const {tracks} = useSelector((state) => state.globalReducer);

  return (
    <View style={styles.container}>
      <TracksListView
        tracks={convertListView(tracks, 'TRACKS')}
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
