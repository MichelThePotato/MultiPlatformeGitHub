import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {deleteTodoItem, getDBConnection} from './db-services';
import {
  EvenementsContext,
  EvenementsDispatchContext,
  ThemeContext,
} from './Context';
import Colors from '../theme/Colors';

const Evenement = ({evenement}) => {
  const navigation = useNavigation();
  const dispatch = useContext(EvenementsDispatchContext);
  const {evenements} = useContext(EvenementsContext);
  const deleteItem = async id => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      dispatch({type: 'deleted', id: id});
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

  return (
    <View>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.item}> {evenement.nom} </Text>
          <Text style={styles.pourText}>Debut: {evenement.debut} </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              deleteItem(evenement.id);
            }}>
            <Text style={styles.pourText}>Supprimer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push('DetailEvent', {
                name: evenement.nom,
                unEvenement: evenement,
              });
            }}>
            <Text style={styles.pourText}>detail</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.ligne}> </Text>
      </View>
    </View>
  );
};

export default Evenement;

const getStyles = theme =>
  StyleSheet.create({
    item: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors[theme]?.colors.white,
    },

    ligne: {
      borderBottomColor: Colors[theme]?.colors.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingHorizontal: 5,
    },

    pourText: {
      color: Colors[theme]?.colors.white,
    },
  });
