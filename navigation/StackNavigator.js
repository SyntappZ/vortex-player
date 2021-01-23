import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../views/splash/SplashScreen';
import SwipeNavigator from './SwipeNavigator';
import {View, Text} from 'react-native';
const Stack = createStackNavigator();

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <Text>hello world</Text>
    </View>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="Splash"
      screenOptions={{
        cardStyle: {backgroundColor: '#222'},
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SwipeNavigator" component={SwipeNavigator} />
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
