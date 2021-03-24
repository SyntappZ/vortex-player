import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {removeArrayFromStorage} from '../store/functions/storageFunctions.js'
import {useSelector, useDispatch} from 'react-redux';
import AllActions from '../store/actions'
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';


const SwipeHeader = ({navigation}) => {
  const dispatch = useDispatch()
  const [isSearching, setSearching] = useState(false);

  const {background, primary, secondary} = useSelector(
    (state) => state.themeReducer.theme,
  );

  const openMenu = () => {
    // navigation.navigate('Settings');
  };
  const search = () => {
    dispatch(AllActions.setAppLoaded(false))
     navigation.navigate('SearchView');
  };

  const wipeStorage = async () => {
    removeArrayFromStorage('favorites')
  };

  return (
    <View style={{...styles.header, backgroundColor: background}}>
    <TouchableOpacity onPress={openMenu} style={styles.hamburger}>
      <Icon size={32} name="navicon" type="evilicon" color="#fff" />
    </TouchableOpacity>
    <View style={styles.title}>
      <Text style={styles.titleText}>
        vortex <Text style={{...styles.blueText, color: secondary}}>player</Text>
      </Text>
    </View>
    <TouchableOpacity onPress={search} style={styles.search}>
    <Icon size={34} name="search" type="evilicon" color="#fff" />

    </TouchableOpacity>
  
    {/* <TouchableOpacity
      // onPress={isSearching ? null : showMenu}
      style={styles.more}>
          <Icon size={30} name="more-vert" color="#fff" />

    </TouchableOpacity> */}
  </View>
  
  );
};




const colorBlack = '#0D0D0D';
const colorLightBlue = '#0B64D9';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    
  },
  hamburger: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  more: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 20,
    fontStyle: 'italic',
  },
  blueText: {
    fontWeight: '100',
  },
});

export default SwipeHeader;
