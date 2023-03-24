import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  createTable,
  getDBConnection,
  getstoreItems,
  savestoreItem,
} from './db-services';
import ListeEvenement from './ListeEvenement';
import ListeTemperature from './ListeTemperature';
import { ThemeContext } from './Context';
import Colors from '../theme/Colors';


const ListeEvenementInterface = () => {
  const navigation = useNavigation();

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);
 
  return (
    <View style={styles.container}>
      <ListeEvenement />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Ajouterevent');
        }}
        style={styles.roundTouch}>
        <Text style={{fontSize: 25}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListeEvenementInterface;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[theme]?.colors.themeColor,
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
  },
});
