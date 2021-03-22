import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FolderListView from '../../components/FolderListView';
import AllActions from '../../store/actions'

const FolderView = ({navigation}) => {
 const dispatch = useDispatch()
  const {folders} = useSelector((state) => state.globalReducer);

  const openFolderPlaylist = (folder) => {
    dispatch(AllActions.setSelectedFolder(folder))
    navigation.navigate('FolderPlaylist'); 
  };
  
 
  
  return (
    <View style={styles.container}>
      <FolderListView folders={folders} openFolderPlaylist={openFolderPlaylist} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FolderView;
