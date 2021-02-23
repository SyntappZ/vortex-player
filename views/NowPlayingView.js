import React, {useEffect} from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Gradient from '../components/Gradient';
import AllActions from '../store/actions'
const NowPlayingView = ({open, setOpen}) => {
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
    <Modal
    animationType="fade"
    transparent={true}
    visible={open}
    onRequestClose={() =>setOpen(!open)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
   
    padding: 35,
    alignItems: "center",
  
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


});

export default NowPlayingView;
