import React from 'react'
import { View, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux'

 const AlbumView = () => {
    const {secondaryBackground} = useSelector((state) => state.themeReducer.theme);
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 70,
    }
})

export default AlbumView