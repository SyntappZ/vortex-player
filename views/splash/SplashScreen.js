import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import MusicFlyLottie from '../../images/lottie/music-fly.json';
import headphones from '../../images/dark-headphones.png'
import {useSelector, useDispatch} from 'react-redux';
const SplashScreen = ({navigation}) => {
  const {background} = useSelector((state) => state.themeReducer.theme);
  const changeView = () => {
    navigation.replace('SwipeNavigator')
  };
  return (
    <View style={{...styles.container, backgroundColor: background}}>
      <View style={styles.welcome}>
      <LottieView style={styles.lottie} source={MusicFlyLottie} autoPlay loop={false} onAnimationFinish={changeView}/>
        <View style={styles.wrap}>
          <Image
            style={styles.image}
            source={headphones}
          />
          <Text style={styles.largeText}>vortex player</Text>
          <Text style={styles.smallText}>Free Music App</Text>
        </View>
      </View>
      <View style={styles.message}>
     
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  largeText: {
    fontSize: 30,
    fontFamily: 'Gugi-Regular',
    color: 'white',
    textAlign: 'center',
  },
  smallText: {
    color: '#555',
    letterSpacing: 1,
    paddingTop: 5,
    textAlign: 'center',
  },
  installText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 5,
  },
  installTitle: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 7,
  },
  textWrap: {
    paddingHorizontal: 60,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loader: {
    flex: 1,
  },
});

export default SplashScreen;
