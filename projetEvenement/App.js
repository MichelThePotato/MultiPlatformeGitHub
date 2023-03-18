import { Settings, StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import Preference from './Preference';
import ListeEvenementInterface from './ListeEvenementInterface';
import CameraScreen from './CameraScreen';
import PermissionScreen from './PermissionScreen';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import Ajouterevent from './ajouterevent';
import ListeEvenement from './ListeEvenement';
import DetailEvent from './DetailEvent';



const App = () => {
  const Stack = createNativeStackNavigator();
  const navigationRef = useNavigationContainerRef();
  const [cameraPermission, setCameraPermission] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);
  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';

  console.log(showPermissionsPage);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{

          headerLeft: () => ( // App Logo
            <Image
              style={{ height: 30, width: 30 }}
              source={require('./Shin_chan_dumpling.jpg')}
              resizeMode='contain'
            />

          ), headerRight: ({ }) => (
            <TouchableOpacity

              onPress={() => { navigationRef.navigate('Preference') }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require('./setting2.png')}
                resizeMode='contain'
              />
            </TouchableOpacity>
          )

        }} >
        </Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUp}>
        </Stack.Screen>
        <Stack.Screen name='Preference' component={Preference}>
        </Stack.Screen>
        <Stack.Screen name='ListeEvenementInterface' component={ListeEvenementInterface}
        >
        </Stack.Screen>
        <Stack.Screen name='CameraScreen' component={CameraScreen}>
        </Stack.Screen>
        <Stack.Screen name='PermissionScreen' component={PermissionScreen}>
        </Stack.Screen>
        <Stack.Screen name='Ajouterevent' component={Ajouterevent} />
        <Stack.Screen name='DetailEvent' component={DetailEvent}
          options={({ route }) => ({ title: route.params.name })}>
        </Stack.Screen>



      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default App

const styles = StyleSheet.create({})