import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';
import MusicFlyLottie from '../../images/lottie/music-fly.json'
 const SplashScreen = ({navigation}) => {

    const changeView = () => {
        navigation.replace('SwipeNavigator')
    }
    return (
        <View style={styles.container}>
            <LottieView style={styles.lottie} source={MusicFlyLottie} autoPlay loop={false} onAnimationFinish={changeView}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222'
    },
    lottie: {
        
    }
})

export default SplashScreen
