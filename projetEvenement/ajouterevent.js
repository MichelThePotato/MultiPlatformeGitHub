import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'
import React,{useContext} from 'react'

import { savestoreItem, getDBConnection } from './db-services';
import { useNavigation } from '@react-navigation/native';
import { store } from './Storage';
import { EvenementsDispatchContext } from './Context';


const Ajouterevent = () => {
    const navigation = useNavigation();
    const [nom, setNom] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [addresse, setAddresse] = React.useState("");
    const [debut, setDebut] = React.useState("");
    const [fin, setFin] = React.useState("");
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
            <View style={{ width: '70%', alignSelf: 'center' }}>
                <Button
                    title={'Ajouter Evenement'}
                    onPress={async () => {
                        const db = await getDBConnection();
                       
                            let newTache = {
                                id: 1,
                                nom: nom,
                                descr: descr,
                                debut:debut,
                                fin:fin,
                
                            };
                            console.log("passe store Tache")

                            let id = await savestoreItem(db, nom, addresse, descr, debut, fin);
                            newTache.id = Object.values(id[0].rows.item(0))[0];
                            console.log(newTache.id)

                            dispatch({
                                type: 'added', 
                                evenement: newTache,
                            });
                            console.log("passe dispatch")
                        navigation.navigate('ListeEvenementInterface');}
                    }
                    disabled={!nom || !descr || !addresse || !debut || !fin}></Button>
            </View>
        </View>);
}

export default Ajouterevent

const styles = StyleSheet.create({})