import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Temperature from './Temperature';
import {ThemeContext} from './Context';
import Colors from '../theme/Colors';

const ListeTemperature = () => {
  const [data, setData] = useState([]);

  const getForecastFromApiAsync = async () => {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=Montreal,ca&units=metric&appid=aa7d03d7b1ca8a71fe0f3882867c4bd5',
      );
      const json = await response.json();

      const jsonArray = [];

      for (let i = 0; i < 39; i++) {
        var jsonObject = {
          id: i,
          temp: json.list[i].main.temp,
          icon: json.list[i].weather[0].icon,
          date: json.list[i].dt_txt,
        };
        jsonArray.push(jsonObject);
      }

      setData(jsonArray);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getForecastFromApiAsync();
  }, []);

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

  return (
    <View>
      <Text style={styles.titre}> Prévision Météorologique</Text>
      <ScrollView horizontal={true}>
        {data.map(forecast => (
          <Temperature key={forecast.id} forecast={forecast}></Temperature>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListeTemperature;

const getStyles = theme =>
  StyleSheet.create({
    titre: {
      fontWeight: 'bold',
      fontSize: 20,
      color: Colors[theme]?.colors.white,
    },
  });
