import { StyleSheet, Text, View, ScrollView, DrawerLayoutAndroid, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
    createTable,
    getDBConnection,
    getstoreItems,
    savestoreItem,
} from './db-services';
import { useNavigation } from '@react-navigation/native';

const ListeEvenement = () => {
    const [data, setData] = useState([]);
    const drawer = useRef(null);
    const [cameraPermissionStatus, setCameraPermissionStatus] =
        useState('not-determined');
    const navigation = useNavigation();

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    const loadDataCallback = useCallback(async () => {
        try {
            // const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
            const db = await getDBConnection();

            // // test pour savoir j'utilise la db sqlite et non le fetch
            // //const db = await getDBConnection();
            // const tableName = 'storeDataV19';
            // insertQuery = `INSERT OR REPLACE INTO ${tableName}(address,banner,city,lastVisit,latitude,longitude) values ( 'test address', 'test banner', 'test city', 'test lastVisit', 'test latitude', 'test longitude')`;
            // db.executeSql(insertQuery)

            await createTable(db);
            const storedTodoItems = await getstoreItems(db);

            if (storedTodoItems.length) {
                setData(storedTodoItems);
                console.log('storedTodoItems');
                console.log(storedTodoItems);
            } else {


                //setData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);



    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission);
    }, []);

    useEffect(() => {
        if (cameraPermissionStatus === 'authorized') navigation.replace('CameraScreen');
    }, [cameraPermissionStatus, navigation]);



    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <TouchableOpacity

                onPress={() => { navigation.navigate('Preference') }}>
                <Image
                    style={{ height: 30, width: 30 }}
                    source={require('./setting2.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={"left"}
            renderNavigationView={navigationView}>
            <View>
                <ScrollView>
                    {data.map(evenement => (
                        <Lieu key={evenement.id} evenement={evenement} />
                    ))}
                </ScrollView>
            </View>
        </DrawerLayoutAndroid>
    )
}

export default ListeEvenement

const styles = StyleSheet.create({})