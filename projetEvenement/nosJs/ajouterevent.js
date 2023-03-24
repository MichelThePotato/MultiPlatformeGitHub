import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';

import {savestoreItem, getDBConnection} from './db-services';
import {useNavigation} from '@react-navigation/native';
import {store} from './Storage';
import {EvenementsDispatchContext} from './Context';
import DatePicker from 'react-native-date-picker';
import { pushNotif } from './NotificationScreen';
import {getIsEnabledNotifStorage} from './Storage';

const Ajouterevent = () => {
  const navigation = useNavigation();
  const [nom, setNom] = React.useState('');
  const [descr, setDescr] = React.useState('');
  const [addresse, setAddresse] = React.useState('');
  const [debut, setDebut] = React.useState('');
  const [fin, setFin] = React.useState('');
  const dispatch = useContext(EvenementsDispatchContext);
  const [datedebut, setDatedebut] = React.useState(new Date());
  const [datefin, setDatefin] = React.useState(new Date());
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

  

  const ajouterUnEvent = async () => {
    const db = await getDBConnection();

    let newTache = {
      id: 1,
      nom: nom,
      descr: descr,
      addresse: addresse,
      debut:datedebut.toLocaleDateString() + ' ' + datedebut.toLocaleTimeString(),
      fin:datefin.toLocaleDateString() + ' ' + datefin.toLocaleTimeString(),
    };
    console.log('passe store Tache');

    let id = await savestoreItem(
      db,
      nom,
      addresse,
      descr,
      datedebut.toLocaleDateString() + ' ' + datedebut.toLocaleTimeString(),
      datefin.toLocaleDateString() + ' ' + datefin.toLocaleTimeString(),
    );
    newTache.id = Object.values(id[0].rows.item(0))[0];
    console.log(newTache.id);

    dispatch({
      type: 'added',
      evenement: newTache,
    });
    console.log('passe dispatch');
    /**
     * une notification lorsque l'évènement est enregistrer
     */
    console.log(await getIsEnabledNotifStorage("isNotifEnabled") + " IsNotifActif");
    if(await getIsEnabledNotifStorage("isNotifEnabled") == "true") {
      console.log("notif go brrrrrrrrrrrr")
      pushNotif(`l'Evènement ${nom} à bien été enregistrer`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.title}>Nom: </Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onTextChangeNom}
          defaultValue={nom}
          placeholder="nom"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.title}>Description: </Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onTextChangeDescr}
          defaultValue={descr}
          placeholder="Description"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.title}>Addresse: </Text>
        <TextInput
          style={styles.inputs}
          onChangeText={onTextChangeAddresse}
          defaultValue={addresse}
          placeholder="Addresse"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.title}>Date de début: </Text>

        {/* <Button title="Date Debut" onPress={() => setOpendebut(true)} /> */}
        <TouchableOpacity onPress={() => setOpendebut(true)}>
          <Text>
            {datedebut.toLocaleDateString() +
              ' ' +
              datedebut.toLocaleTimeString()}{' '}
          </Text>

          <DatePicker
            modal
            open={opendebut}
            date={datedebut}
            onConfirm={datedebut => {
              setOpendebut(false);
              setDatedebut(datedebut);
            }}
            onCancel={() => {
              setOpendebut(false);
            }}
          />
        </TouchableOpacity>
        <Text></Text>
      </View>
      <View style={styles.datePickerView}>
        <Text style={styles.title}>Date Fin: </Text>

        <TouchableOpacity onPress={() => setOpenfin(true)}>
          <Text>
            {datefin.toLocaleDateString() + ' ' + datefin.toLocaleTimeString()}
          </Text>

          <DatePicker
            modal
            open={openfin}
            date={datefin}
            onConfirm={datefin => {
              setOpenfin(false);
              setDatefin(datefin);
              console.log(datefin);
            }}
            onCancel={() => {
              setOpenfin(false);
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '70%', alignSelf: 'center'}}>
        <Button
          title={'Ajouter Evenement'}
          onPress={() => {
            ajouterUnEvent();
            navigation.navigate('ListeEvenementInterface');
          }}
          disabled={!nom || !descr || !addresse}></Button>
      </View>
    </View>
  );
};

export default Ajouterevent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    gap: 10,
    paddingTop: 20,
  },
  inputView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  datePickerView: {
    flexDirection: 'column',

    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
