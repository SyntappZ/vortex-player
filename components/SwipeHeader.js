import React, {useState, useEffect} from 'react';
import {Icon, Header} from 'react-native-elements';
// import {clearAllStorage} from '../data/AsyncStorage.js';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const SwipeHeader = ({navigation}) => {
  const [isSearching, setSearching] = useState(false);

  const {background, secondary} = useSelector(
    (state) => state.themeReducer.theme,
  );

  const openMenu = () => {
    // navigation.navigate('Settings');
  };
  const search = () => {
    // navigation.navigate('Search');
  };

  const wipeStorage = async () => {
    // moveImageToFolder('/storage/emulated/0/3733.jpg')
    //   const checkFolder = await RNFS.readDir('/storage/emulated/0/albumArt');
    //   const folderImageList = checkFolder.map(item => item.path.match(/[^\/]+(?=\/$|$)/)[0]);
    // console.log(folderImageList)
    // const message = await clearAllStorage();
    // console.log(message);
  };

  return (
    <View style={{...styles.header, backgroundColor: background}}>
    <TouchableOpacity onPress={openMenu} style={styles.hamburger}>
      <Icon size={38} name="navicon" type="evilicon" color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity onPress={wipeStorage} style={styles.title}>
      <Text style={styles.titleText}>
        vortex <Text style={{...styles.blueText, color: secondary}}>player</Text>
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={search} style={styles.search}>
    <Icon size={34} name="search" type="evilicon" color="#fff" />

    </TouchableOpacity>
  
    <TouchableOpacity
      // onPress={isSearching ? null : showMenu}
      style={styles.more}>
          <Icon size={30} name="more-vert" color="#fff" />

    </TouchableOpacity>
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
