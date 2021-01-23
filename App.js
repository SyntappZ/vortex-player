import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import MainContainer from './navigation/MainContainer';
import {StatusBar, View, StyleSheet} from 'react-native';
const store = configureStore();

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <StatusBar backgroundColor="#222" />
        <MainContainer />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
});

export default App;
