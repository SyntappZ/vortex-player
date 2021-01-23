import React from 'react'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator'
function MainContainer() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}


export default MainContainer