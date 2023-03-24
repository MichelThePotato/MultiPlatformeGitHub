import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from './Context';
import Colors from '../theme/Colors';

const Temperature = ({ forecast }) => {
    const imageUri = 'https://openweathermap.org/img/wn/'+ forecast.icon + '.png'

     /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

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
                <Text style={styles.pourText}>
                    {forecast.date}
                </Text>
            </View>
        </View>
    );
};

export default Temperature;

const getStyles = theme => StyleSheet.create({
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
        color: Colors[theme]?.colors.white,
    },
    date: {
        fontSize: 2,
    },
    pourText:{
        color: Colors[theme]?.colors.white,
    }
});
