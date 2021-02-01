import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import musicBars from '../images/lottie/bars.json';
import AllActions from '../store/actions'
const FabButton = () => {
    const dispatch = useDispatch()
  const {
    lightBackground,

    primary,
  } = useSelector((state) => state.themeReducer.theme);
  const { isPlaying } = useSelector((state) => state.playerReducer);

  const colorArray = Array(21)
    .fill('')
    .map((_, i) => {
      return {
        keypath: `形状图层 ${i}`,
        color: '#ffffff',
      };
    });

  const fabHandler = () => {
    dispatch(AllActions.setIsPlaying(!isPlaying))
  };
  return (
    <View style={{ ...styles.fabWrap, backgroundColor: lightBackground }}>
      <TouchableOpacity
        onPress={fabHandler}
        style={{
          ...styles.fab,
          backgroundColor: primary,
          paddingLeft: isPlaying ? null : 3,
        }}>
        {isPlaying ? (
          <LottieView
            style={{ width: '90%' }}
            source={musicBars}
            autoPlay={true}
            loop={true}
            colorFilters={colorArray}
          />
        ) : (
          <Icon name="play" type="font-awesome-5" color="#fff" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const radius = 40;

const styles = StyleSheet.create({
  fab: {
    width: 70,
    height: 70,
    flex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabWrap: {
    position: 'absolute',
    top: -35,
    borderRadius: 50,
    right: radius,
    zIndex: 1000,
  },
});

export default FabButton;
