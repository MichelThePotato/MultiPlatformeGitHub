import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dateDiff } from './db-services'

const DetailEvent = (   ) => {
    // await dateDiff();
    return (
        <View style={styles.detail}>
            <Text>DetailEvent</Text>
        </View>
    )
}

export default DetailEvent

const styles = StyleSheet.create({
    detail:{
        flex:1,
        alignItems:"center"
    }


})