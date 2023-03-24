import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { EvenementsContext } from './Context';

const DetailEvent = (route) => {
  const { unEvenement } = route.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>addresse: </Text>
        <Text >{JSON.stringify(unEvenement.addresse)}</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>description: </Text>
        <Text >{JSON.stringify(unEvenement.descr)}</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>date début: </Text>
        <Text >{JSON.stringify(unEvenement.debut)}</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.title}>date fin: </Text>
        <Text >{JSON.stringify(unEvenement.fin)}</Text>
      </View>
    </View>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    gap: 10,
    paddingTop: 20,

  },
  inputView: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
