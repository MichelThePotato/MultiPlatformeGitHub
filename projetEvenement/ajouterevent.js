import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

import { savestoreItem, getDBConnection } from './db-services';
import { useNavigation } from '@react-navigation/native';


const Ajouterevent = () => {
    const navigation = useNavigation();
    const [nom, setNom] = React.useState('');
    const [descr, setDescr] = React.useState('');
    const [addresse, setAddresse] = React.useState("");
    const [debut, setDebut] = React.useState("");
    const [fin, setFin] = React.useState("");
    const [newTodo, setNewTodo] = useState('');

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
    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            const newTodos = [...todos, {
                id: todos.reduce((acc, cur) => {
                    if (cur.id > acc.id) return cur;
                    return acc;
                }).id + 1, value: newTodo
            }];
            setTodos(newTodos);
            const db = await getDBConnection();
            // await saveTodoItems(db, newTodos);
            await saveTodoItems(db, nom, addresse, descr, debut, fin);
            setNewTodo('');
        } catch (error) {
            console.error(error);
        }
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
                        await savestoreItem(db, nom, addresse, descr, debut, fin);
                        // addTodo();
                        navigation.navigate('ListeEvenementInterface');
                    }}
                    disabled={!nom || !descr || !addresse || !debut || !fin}></Button>
            </View>
        </View>);
}

export default Ajouterevent

const styles = StyleSheet.create({})