import { StyleSheet, Text, View,ScrollView,TextInput,Button } from 'react-native'
import React from 'react'

import { savestoreItem } from './db-services';
import { useNavigation } from '@react-navigation/native';


const Ajouterevent = () => {
    const navigation = useNavigation();
    const [nom, setNom] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [addresse, setAddresse] = React.useState("");
    const [debut, setDebut] = React.useState("");
    const [fin, setFin] = React.useState("");
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
                        await savestoreItem(nom,addresse,descr,debut,fin);
                        navigation.navigate('ListeEvenementInterface');
                    }}
                    disabled={!nom || !descr||!addresse||!debut||!fin}></Button>
            </View>
        </View>);
}

export default Ajouterevent

const styles = StyleSheet.create({})