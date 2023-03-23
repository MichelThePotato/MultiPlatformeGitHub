import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, {useContext, useEffect, useState, useRoute} from 'react';

import {LieuxContext} from './LieuContext';
import {useNavigation} from '@react-navigation/native';
import {deleteTodoItem, getDBConnection} from './db-services';
import {EvenementsContext, EvenementsDispatchContext} from './Context';

const Evenement = ({evenement}) => {
  const navigation = useNavigation();
  const dispatch = useContext(EvenementsDispatchContext);
  const evenements = useContext(EvenementsContext);
  const deleteItem = async id => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      dispatch({type: 'deleted', id: id});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.item}> {evenement.nom} </Text>
          <TouchableOpacity
            onPress={() => {
              
              navigation.push('DetailEvent', {
                name: evenement.nom,
                unEvenement: evenement,
              });
            }}>
            <Text>detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Modifierevent', {evenement});
            }}>
            <Text>modifier</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            deleteItem(evenement.id);
          }}>
          <Text>{evenement.id}</Text>
        </TouchableOpacity>
        <Text style={styles.ligne}> </Text>
      </View>
    </View>
  );
};

export default Evenement;

const styles = StyleSheet.create({
  item: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  ligne: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 5,
  },
});
