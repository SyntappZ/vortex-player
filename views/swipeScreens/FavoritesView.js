import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TracksListView from '../../components/TracksListView';
import { Icon } from 'react-native-elements';
import AllActions from '../../store/actions';
import FAB from 'react-native-fab';
const favoritesView = () => {
  const dispatch = useDispatch();

  const { favorites } = useSelector((state) => state.globalReducer);
  const { primary } = useSelector((state) => state.themeReducer.theme);
  const icon = <Icon type="entypo" name="shuffle" size={20} color={'white'} />;

  const handleShuffle = () => {
    dispatch(AllActions.handleShuffleAsync(favorites));
  };
  
  return (
    <View style={styles.container}>
      <TracksListView tracks={favorites} />

      {favorites.length > 1 ? (   <FAB
        buttonColor={primary}
        snackOffset={90}
        iconTextColor={'white'}
        onClickAction={handleShuffle}
        iconTextComponent={icon}
      />) : null}
   
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

export default favoritesView;
