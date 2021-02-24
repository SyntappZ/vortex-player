import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Heart from "../components/Heart"
import { useSelector, useDispatch } from 'react-redux';
import Gradient from '../components/Gradient';
import AllActions from '../store/actions';
import CircleSliderContainer from "../components/CircleSliderContainer"
const NowPlayingView = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(null)

  const { primary, background, secondary, subtext } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const { currentPlayingTrack, albumData } = useSelector(
    (state) => state.playerReducer,
  );

  const modalHandler = () => {};
  const shuffleToggle = () => {};
  const storeFavorite = () => {};
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(!open)}>
      <View style={{ ...styles.container, backgroundColor: background }}>
      <StatusBar backgroundColor={primary} barStyle={'light-content'} animated={true}/>
        <View style={{...styles.nowPlaying, backgroundColor: primary}}>
          <Text style={styles.nowPlayingText}>Now Playing</Text>
        </View>
        <View style={{...styles.titleContainer}}>
          <Text numberOfLines={1} style={{...styles.author, color: "white"}}>{currentPlayingTrack.author}</Text>
          <Text numberOfLines={1} style={{...styles.title, color: subtext}}>{currentPlayingTrack.title}</Text>
        </View>
        <View style={{...styles.imageContainer}}>
          <CircleSliderContainer />
        </View>
     
        <View style={{...styles.favoriteContainer}}>
          <TouchableOpacity style={styles.lottieWrap} onPress={() => setIsFavorite(!isFavorite)}>
          <Heart isFavorite={isFavorite} />
          </TouchableOpacity>
         
        </View>
        <View style={{...styles.controlsContainer}}>
          
        </View>
        <View style={{...styles.lottieContainer}}>
          
          </View>
       

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  nowPlaying: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  nowPlayingText: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
    
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 50
  },
  author: {
    fontSize: 22,
  },
  imageContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    

  },
  favoriteContainer:  {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 50
    // backgroundColor: "yellow"

  },

  lottieWrap: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red"
  },
  controlsContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    paddingHorizontal: 50
  },
  lottieContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    paddingHorizontal: 50
  }
});

export default NowPlayingView;
