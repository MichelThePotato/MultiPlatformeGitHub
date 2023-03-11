import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    createTable,
    getDBConnection,
    getstoreItems,
    savestoreItem,
} from './db-service';
import ListeEvenement from './ListeEvenement';

const ListeEvenementInterface = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ListeEvenement/>
            <TouchableOpacity
                onPress={() => { navigation.navigate("Ajouterevent") }}
                style={styles.roundTouch}>
                <Text style={{ fontSize: 25 }}>+</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default ListeEvenementInterface


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    roundTouch: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 45,
        right: 35,



    }
})