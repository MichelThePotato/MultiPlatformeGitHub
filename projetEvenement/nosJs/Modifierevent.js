import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import React, {useContext} from 'react';
import {savestoreItem, getDBConnection, updatestoreItem} from './db-services';
import {useNavigation} from '@react-navigation/native';
import {store} from './Storage';
import {EvenementsDispatchContext} from './Context';

const Modifierevent = ({route}) => {
  const navigation = useNavigation();
  const {evenement} = route.params;
  const [nom, setNom] = React.useState(evenement.nom);
  const [descr, setDescr] = React.useState(evenement.descr);
  const [addresse, setAddresse] = React.useState(evenement.addresse);
  const [debut, setDebut] = React.useState(evenement.debut);
  const [fin, setFin] = React.useState(evenement.fin);
  const dispatch = useContext(EvenementsDispatchContext);

  const onTextChangeNom = text => {
    setNom(text);
  };
  const onTextChangeDescr = text => {
    setDescr(text);
  };

  const onTextChangeAddresse = text => {
    setAddresse(text);
  };
  const onTextChangeDebut = text => {
    setDebut(text);
  };
  const onTextChangeFin = text => {
    setFin(text);
  };
  console.log('Bonjour,' + evenement.id);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChangeNom}
        defaultValue={nom}
        placeholder="nom"></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChangeDescr}
        defaultValue={descr}
        placeholder="Description"></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChangeAddresse}
        defaultValue={addresse}
        placeholder="Addresse"></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChangeDebut}
        defaultValue={debut}
        placeholder="Debut"></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChangeFin}
        defaultValue={fin}
        placeholder="Fin"></TextInput>
      <View style={{width: '70%', alignSelf: 'center'}}>
        <Button
          title={'Modifier Evenement'}
          onPress={async () => {
            const db = await getDBConnection();

            let newTache = {
              id: evenement.id,
              nom: nom,
              descr: descr,
              debut: debut,
              fin: fin,
            };
            console.log('passe store Tache');

            await updatestoreItem(
              db,
              nom,
              addresse,
              descr,
              debut,
              fin,
              evenement.id,
            );

            console.log(nom);

            dispatch({
              type: 'changed',
              evenement: newTache,
            });
            console.log('passe dispatch');
            navigation.navigate('ListeEvenementInterface');
          }}></Button>
      </View>
    </View>
  );
};

export default Modifierevent;

const styles = StyleSheet.create({});
