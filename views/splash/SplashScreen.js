import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import Headphones from '../../images/lottie/headphones.json';
// import headphones from '../../images/dark-headphones.png'
import AllActions from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
const SplashScreen = ({navigation}) => {
  const {background, primary} = useSelector(
    (state) => state.themeReducer.theme,
  );

  const dispatch = useDispatch();
  const changeView = () => {
    navigation.replace('SwipeNavigator');
    dispatch(AllActions.setAppLoaded());
  };

  return (
    <View style={{...styles.container, backgroundColor: background}}>
      <View style={styles.lottieWrap}>
        <LottieView
          style={styles.lottie}
          source={Headphones}
          onAnimationFinish={changeView}
          autoPlay
          loop={false}
          colorFilters={[
            {
              keypath: 'Head',
              color: primary,
            },
            {
              keypath: 'Cover Left',
              color: primary,
            },
            {
              keypath: 'Cover Right',
              color: primary,
            },
          ]}
        />
      </View>

      <Text style={styles.largeText}>vortex player</Text>
      <Text style={styles.smallText}>Free Music App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lottieWrap: {
    width: 150,
    marginBottom: 40,
  },
  lottie: {
    width: '100%',
  },

  largeText: {
    fontSize: 35,
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

  wrap: {
    // backgroundColor: 'red',
  },
});

export default SplashScreen;
