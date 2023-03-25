import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from './Context';
import Colors from '../theme/Colors';

const DetailEvent = route => {
  const {unEvenement} = route.route.params;

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>addresse: </Text>
        <Text style={styles.pourText}>
          {JSON.stringify(unEvenement.addresse)}
        </Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>description: </Text>
        <Text style={styles.pourText}>{JSON.stringify(unEvenement.descr)}</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>date début: </Text>
        <Text style={styles.pourText}>{JSON.stringify(unEvenement.debut)}</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>date fin: </Text>
        <Text style={styles.pourText}>{JSON.stringify(unEvenement.fin)}</Text>
      </View>
    </View>
  );
};

export default DetailEvent;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      gap: 10,
      padding: 20,
      backgroundColor: Colors[theme]?.colors.themeColor,
    },
    inputView: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[theme]?.colors.white,
    },
    pourText: {
      color: Colors[theme]?.colors.white,
    },
  });
