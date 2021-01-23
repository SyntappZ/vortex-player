import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import StackNavigator from './StackNavigator';

const AppContainer = () => {
  const {secondaryBackground, background} = useSelector(
    (state) => state.themeReducer.theme,
  );

  const MyTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryBackground,
    },
  };
  return (
    <View style={{...styles.container, backgroundColor: background}}>
      <StatusBar backgroundColor={background} />
      <NavigationContainer theme={MyTheme}>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
