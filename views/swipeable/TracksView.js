import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Track from '../../components/Track'
import {useSelector} from 'react-redux';

const renderItem = ({item}) => (
    <Track
      title={item.title}
      author={item.author}
      id={item.id}
      displayDuration={item.displayDuration}
    />
  );
  
  const getItemLayout = (data, index) => ({
    length: 70,
    offset: 70 * index,
    index,
  });

const TracksView = () => {
    const {tracks} = useSelector(state => state.globalReducer)
    console.log(tracks[0])
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={(item) => `item-id${item.id}`}
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
