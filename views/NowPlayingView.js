import React, {useEffect} from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Gradient from '../components/Gradient';
import AllActions from '../store/actions'
const NowPlayingView = () => {
    const dispatch = useDispatch()
  const { primary, background } = useSelector(
    (state) => state.themeReducer.theme,
  );

  useEffect(() => {
    return () => {
        // dispatch(AllActions.setPlayerVisibility(true))
    }
  }, [])

  const modalHandler = () => {};
  const shuffleToggle = () => {};
  const storeFavorite = () => {};
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor= animated={true} /> */}

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },


});

export default NowPlayingView;
