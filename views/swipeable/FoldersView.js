import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Folder from '../../components/Folder';
const renderItem = ({item}) => (
  <Folder
    folderName={item.album}
    author={item.author}
    id={item.id}
    numberOfSongs={item.numberOfSongs}
  />
);

const getItemLayout = (data, index) => ({
  length: 60,
  offset: 60 * index,
  index,
});

const FolderView = () => {
    
    const {folders} = useSelector(state => state.globalReducer)
  return (
    <View style={styles.container}>
      <FlatList
        data={folders}
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

export default FolderView;
