import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SwipeNavigator = () => {
  return (
    <View style={styles.container}>
      <Text>hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
});

export default SwipeNavigator;
