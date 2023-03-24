import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import React, { useContext } from 'react';
import { savestoreItem, getDBConnection, updatestoreItem } from './db-services';
import { useNavigation } from '@react-navigation/native';
import { store } from './Storage';
import { EvenementsDispatchContext } from './Context';
import DatePicker from 'react-native-date-picker'

const Modifierevent = ({ route }) => {
  const navigation = useNavigation();
  const { evenement } = route.params;
  const dispatch = useContext(EvenementsDispatchContext);

  const [nom, setNom] = React.useState(evenement.nom);
  const [descr, setDescr] = React.useState(evenement.descr);
  const [addresse, setAddresse] = React.useState(evenement.addresse);
  const [datedebut, setDatedebut] = React.useState(new Date(evenement.debut))
  const [datefin, setDatefin] = React.useState(new Date(evenement.fin))
  const [openfin, setOpenfin] = React.useState(false);
  const [opendebut, setOpendebut] = React.useState(false);

  const onTextChangeNom = text => {
    setNom(text);
  };
  const onTextChangeDescr = text => {
    setDescr(text);
  };

  const onTextChangeAddresse = text => {
    setAddresse(text);
  };
  console.log("allo:" + evenement.fin)
  console.log('Bonjour,' + evenement.id);

  const modifierUnEvent = async () => {
    const db = await getDBConnection();

    let newTache = {
      id: evenement.id,
      nom: nom,
      descr: descr,
      debut: datedebut.toISOString(),
      fin: datefin.toISOString(),
    };
    console.log('passe store Tache');

    await updatestoreItem(
      db,
      nom,
      addresse,
      descr,
      datedebut.toISOString(),
      datefin.toISOString(),
      evenement.id,
    );

    console.log(nom);

    dispatch({
      type: 'changed',
      evenement: newTache,
    });
    console.log('passe dispatch');
  }

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
      <Button title="Date Debut" onPress={() => setOpendebut(true)} />
      <DatePicker
        modal
        open={opendebut}
        date={datedebut}
        onConfirm={(datedebut) => {
          setOpendebut(false)
          setDatedebut(datedebut)
        }}
        onCancel={() => {
          setOpendebut(false)
        }}
      />
      <Button title="Date Fin" onPress={() => setOpenfin(true)} />
      <DatePicker
        modal
        open={openfin}
        date={datefin}
        onConfirm={(datefin) => {
          setOpenfin(false)
          setDatefin(datefin)
          console.log(datefin)
        }}
        onCancel={() => {
          setOpenfin(false)
        }}
      />
      <View style={{ width: '70%', alignSelf: 'center' }}>
        <Button
          title={'Modifier Evenement'}
          onPress={async () => {
            modifierUnEvent()
            navigation.navigate('ListeEvenementInterface');
          }}></Button>
      </View>
    </View>
  );
};

export default Modifierevent;

const styles = StyleSheet.create({});
