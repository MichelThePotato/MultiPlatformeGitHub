import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailEvent = (route) => {
  const { unEvenement } = route.route.params;
  return (
    <View>
      <Text>addresse: {JSON.stringify(unEvenement.addresse)}</Text>
      <Text>description: {JSON.stringify(unEvenement.descr)}</Text>
      <Text>date début: {JSON.stringify(unEvenement.debut)}</Text>
      <Text>date fin: {JSON.stringify(unEvenement.fin)}</Text>
    </View>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({});
