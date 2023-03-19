import { PermissionsAndroid, StyleSheet, Text, View, ScrollView, DrawerLayoutAndroid, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
    createTable,
    getDBConnection,
    getstoreItems,
    savestoreItem,
} from './db-services';
import { useNavigation } from '@react-navigation/native';

import { Camera } from 'react-native-vision-camera';
import Evenement from './Evenement';



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
                await savestoreItem(db, data);
                console.log('data');
                console.log(data);
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
        if (cameraPermissionStatus === 'authorized')
            navigation.replace('CameraScreen');
    }, [cameraPermissionStatus, navigation]);



    const navigationView = () => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity

                onPress={() => { navigation.navigate('Preference') }}>
                <View style={{ flexDirection: "row" }}>

                    <Image
                        style={styles.bordure}
                        source={require('./setting2.png')}
                        resizeMode='contain'
                    />
                    <Text>Preference</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity

                onPress={requestCameraPermission}>
                <Image
                    style={styles.bordure}
                    source={require('./camera1.png')}
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
                        <Evenement key={evenement.id} evenement={evenement} />
                    ))}
                </ScrollView>
            </View>
        </DrawerLayoutAndroid>
    )
}

export default ListeEvenement

const styles = StyleSheet.create({

    bordure: {
        height: 50,
        width: 50,
        margin: 10,


    }
})