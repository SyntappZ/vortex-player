import React, {useEffect} from 'react'
import { View, StyleSheet } from 'react-native'


 const SearchView = () => {

    useEffect(() => {
        console.log('open')
        return () => console.log('closed')
    }, [])
    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default SearchView