import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import TracksListView from '../../components/TracksListView';




const TracksView = () => {
  const {tracks} = useSelector((state) => state.globalReducer);
  
//   const ids = tracks.map(item => item.id)

//   let count = ids.reduce((a, b) => {
//     a[b] = (a[b] || 0) + 1;
//     return a;
// },{});
// console.log(Object.values(count))

  return (
    <View style={styles.container}>
      <TracksListView
        tracks={tracks}
        allTracks={true}
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
