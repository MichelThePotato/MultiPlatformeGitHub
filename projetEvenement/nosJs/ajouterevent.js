import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'
import React, { useContext } from 'react'

import { savestoreItem, getDBConnection } from './db-services';
import { useNavigation } from '@react-navigation/native';
import { store } from './Storage';
import { EvenementsDispatchContext } from './Context';
import DatePicker from 'react-native-date-picker'


const Ajouterevent = () => {
    const navigation = useNavigation();
    const [nom, setNom] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [addresse, setAddresse] = React.useState("");
    const [debut, setDebut] = React.useState("");
    const [fin, setFin] = React.useState("");
    const dispatch = useContext(EvenementsDispatchContext);
    const [datedebut, setDatedebut] = React.useState(new Date())
    const [datefin, setDatefin] = React.useState(new Date())
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
                    title={'Ajouter Evenement'}
                    onPress={async () => {
                        const db = await getDBConnection();

                        let newTache = {
                            id: 1,
                            nom: nom,
                            descr: descr,
                            address:addresse,
                            debut: debut,
                            fin: fin,

                        };
                        console.log("passe store Tache")

                        let id = await savestoreItem(db, nom, addresse, descr, datedebut.toISOString(), datefin.toISOString());
                        newTache.id = Object.values(id[0].rows.item(0))[0];
                        console.log(newTache.id)

                        dispatch({
                            type: 'added',
                            evenement: newTache,
                        });
                        console.log("passe dispatch")
                        navigation.navigate('ListeEvenementInterface');
                    }
                    }
                    disabled={!nom || !descr || !addresse }></Button>
            </View>
        </View>);
}

export default Ajouterevent

const styles = StyleSheet.create({})