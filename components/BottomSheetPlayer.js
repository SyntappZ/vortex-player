import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { vw, vh } from 'react-native-viewport-units';
// const {width, height} = Dimensions.get('window')

const height = 106 * vh;
const BottomSheetPlayer = () => {
  const { sheetSnapPoint } = useSelector((state) => state.globalReducer);
  const { primary, background } = useSelector(
    (state) => state.themeReducer.theme,
  );
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState('row');
  const [playerHeight, setHeight] = useState(80);

  useEffect(() => {
    openScreen(open);
  }, [open]);

  const resizeSheet = (snap) => {
    sheetRef.current.snapTo(snap);
  };
  const openScreen = (isOpen) => {
    const size = isOpen ? 0 : 1;
    const height = isOpen ? "40%" : 80
    setHeight(height)
    resizeSheet(size);
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',

        height: '100%',
        width: '100%',
      }}>
      {/* <TouchableOpacity
        style={styles.openScreen}
        onPress={() => setOpen(!open)}>
        <Text>open the modal</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{ ...styles.box, backgroundColor: 'red', height: playerHeight }}>
        <View style={{ ...styles.image, backgroundColor: 'pink' }}></View>
      </TouchableOpacity>
      <View style={{ ...styles.box, backgroundColor: 'blue', flex: 1 }}></View>
      <View style={{ ...styles.box, backgroundColor: 'green', flex: 1 }}></View>
    </View>
  );

  const sheetRef = useRef(null);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[height, 80, 0]}
      borderRadius={open ? 0 : 30}
      renderContent={renderContent}
      initialSnap={1}
      enabledContentTapInteraction={false}
      // enabledBottomInitialAnimation={true}
    />
  );
};

const styles = StyleSheet.create({
  openScreen: {},
  box: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
  },
});
export default BottomSheetPlayer;
