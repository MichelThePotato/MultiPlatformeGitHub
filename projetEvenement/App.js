import {
  Settings,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import Modifierevent from './nosJs/Modifierevent';
import Login from './nosJs/Login';
import SignUp from './nosJs/SignUp';
import Preference from './nosJs/Preference';
import ListeEvenement from './nosJs/ListeEvenement';
import DetailEvent from './nosJs/DetailEvent';
import Ajouterevent from './nosJs/ajouterevent';
import {EvenementReducer} from './nosJs/EvenementReducer';
import {getstoreItems, getDBConnection,createTable} from './nosJs/db-services';
import {EvenementsContext, EvenementsDispatchContext} from './nosJs/Context';
import ListeEvenementInterface from './nosJs/ListeEvenementInterface';
import CameraScreen from './nosJs/CameraScreen';
import PermissionScreen from './nosJs/PermissionScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
  const [cameraPermission, setCameraPermission] = useState();
  const [evenements, dispatch] = useReducer(EvenementReducer, []);

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);

    async function fetchFromStorage() {
      const db = await getDBConnection();
      await createTable(db);
      const EvenementTask = await getstoreItems(db);
      console.log(EvenementTask);
      dispatch({type: 'init', evenements: EvenementTask});
    }

    fetchFromStorage();
  }, []);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);
  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';
  const value = console.log(showPermissionsPage);
  return (
    <NavigationContainer ref={navigationRef}>
      <EvenementsContext.Provider value={evenements}>
        <EvenementsDispatchContext.Provider value={dispatch}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerLeft: () => (
                  // App Logo
                  <Image
                    style={{height: 30, width: 30}}
                    source={require('./photos/Shin_chan_dumpling.jpg')}
                    resizeMode="contain"
                  />
                ),
                headerRight: ({}) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigationRef.navigate('Preference');
                    }}>
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('./photos/setting2.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ),
              }}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
            <Stack.Screen
              name="Preference"
              component={Preference}></Stack.Screen>
            <Stack.Screen
              name="ListeEvenementInterface"
              component={ListeEvenementInterface}></Stack.Screen>
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}></Stack.Screen>
            <Stack.Screen
              name="PermissionScreen"
              component={PermissionScreen}></Stack.Screen>
            <Stack.Screen name="Ajouterevent" component={Ajouterevent} />
            <Stack.Screen
              name="Modifierevent"
              component={Modifierevent}></Stack.Screen>

            <Stack.Screen
              name="DetailEvent"
              component={DetailEvent}
              options={({route}) => ({
                title: route.params.name,
              })}></Stack.Screen>
          </Stack.Navigator>
        </EvenementsDispatchContext.Provider>
      </EvenementsContext.Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
