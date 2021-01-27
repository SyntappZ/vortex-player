import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import FolderListView from '../../components/FolderListView';


const FolderView = () => {
 
  const {folders} = useSelector((state) => state.globalReducer);
  
  return (
    <View style={styles.container}>
      <FolderListView folders={folders} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FolderView;
