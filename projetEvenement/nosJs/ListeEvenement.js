import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
  ScrollView,
  DrawerLayoutAndroid,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import {
  createTable,
  getDBConnection,
  getstoreItems,
  savestoreItem,
} from './db-services';
import {useNavigation} from '@react-navigation/native';

import {Camera} from 'react-native-vision-camera';
import Evenement from './Evenement';
import {EvenementsContext, EvenementsDispatchContext} from './Context';

const ListeEvenement = () => {
  const drawer = useRef(null);
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState('not-determined');
  const navigation = useNavigation();
  const evenements = useContext(EvenementsContext);
  const dispatch = useContext(EvenementsDispatchContext);

  useEffect(() => {
    async function fetchFromStorage() {
      const db = await getDBConnection();
      await createTable(db);
      const EvenementTask = await getstoreItems(db);
      //console.log(EvenementTask);
      dispatch({type: 'init', evenements: EvenementTask});
    }
    fetchFromStorage();
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
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Preference');
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.bordure}
            source={require('../photos/setting2.png')}
            resizeMode="contain"
          />
          <Text>Preference</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={requestCameraPermission}>
        <Image
          style={styles.bordure}
          source={require('../photos/camera1.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  //console.log(evenements);
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}>
      <View>
        <ScrollView>
          {evenements.map(evenement => (
            <Evenement key={evenement.id} evenement={evenement} />
          ))}
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default ListeEvenement;

const styles = StyleSheet.create({
  bordure: {
    height: 50,
    width: 50,
    margin: 10,
  },
});
