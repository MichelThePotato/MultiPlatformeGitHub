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
import ListeTemperature from './ListeTemperature';
import {Camera} from 'react-native-vision-camera';
import Evenement from './Evenement';
import {EvenementsContext, EvenementsDispatchContext, ThemeContext} from './Context';
import Colors from '../theme/Colors';

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

   /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
   const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
   const styles = getStyles(themeChoisi);
  
  const navigationView = () => (
    <View style={[{flex: 1}, styles.container]}>
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
        
      <ListeTemperature></ListeTemperature>
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

const getStyles = theme => StyleSheet.create({
  bordure: {
    height: 50,
    width: 50,
    margin: 10,
    color: Colors[theme]?.colors.white,
  },

  pourText: {
    color: Colors[theme]?.colors.white,
  },

  container:{
    backgroundColor: Colors[theme]?.colors.themeColor,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
     backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
