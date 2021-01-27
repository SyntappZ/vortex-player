import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import FolderListView from '../../components/FolderListView';


const FolderView = ({navigation}) => {
 
  const {folders} = useSelector((state) => state.globalReducer);

  const changeView = () => {
    navigation.navigate('FolderPlaylist'); 
  };
  
  return (
    <View style={styles.container}>
      <FolderListView folders={folders} changeView={changeView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FolderView;
