import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';

const Temperature = ({ forecast }) => {
    const imageUri = 'https://openweathermap.org/img/wn/'+ forecast.icon + '.png'

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.temperature}>
                    {forecast.temp}°C
                </Text>
            </View>
            <View style={styles.imagecontainer}>
                <Image source={{uri: imageUri}}
                style={{width: 80, height: 80}}/>
            </View>
            <View style={styles.date}>
                <Text>
                    {forecast.date}
                </Text>
            </View>
        </View>
    );
};

export default Temperature;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b69cf6',
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    imagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    temperature: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    date: {
        fontSize: 2,
    },
});
