import {
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Camera} from 'react-native-vision-camera';
import Login from './nosJs/Login';
import SignUp from './nosJs/SignUp';
import Preference from './nosJs/Preference';
import DetailEvent from './nosJs/DetailEvent';
import Ajouterevent from './nosJs/ajouterevent';
import {EvenementReducer} from './nosJs/EvenementReducer';
import {getstoreItems, getDBConnection, createTable} from './nosJs/db-services';
import {
  EvenementsContext,
  EvenementsDispatchContext,
  ThemeContext,
} from './nosJs/Context';
import ListeEvenementInterface from './nosJs/ListeEvenementInterface';
import CameraScreen from './nosJs/CameraScreen';
import PermissionScreen from './nosJs/PermissionScreen';
import {getColorsPreferences, saveColorsPreferences} from './nosJs/Storage';
import Colors from './theme/Colors';

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const [cameraPermission, setCameraPermission] = useState();
  const [evenements, dispatch] = useReducer(EvenementReducer, []);
  const theme = useColorScheme();
  // const theme = getColorsPreferences('Theme');

  const appearance = useColorScheme();

  /**
   *  méthode qui set le theme qui à été choisi dans les préférence
   */
  const setAppTheme = useCallback(async () => {
    const IS_FIRST = await getColorsPreferences('IS_FIRST');
    if (IS_FIRST === null) {
      saveColorsPreferences('Theme', appearance);
      saveColorsPreferences('IsDefault', true);
      saveColorsPreferences('IS_FIRST', true);
    } else {
      // theme = await getColorsPreferences('IS_FIRST');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [themeChoisi, setThemeChoisi] = useState('');
  const sendValueTheme = {themeChoisi, setThemeChoisi};

  const getAppTheme = useCallback(async () => {
    try {
      const theme = await getColorsPreferences('Theme');
      setThemeChoisi(theme);
    } catch (error) {
      console.log('erreur dans getAppTheme : ', error);
    }
  }, []);

  useEffect(() => {
    try {
      Camera.getCameraPermissionStatus().then(setCameraPermission);

      async function fetchFromStorage() {
        const db = await getDBConnection();
        await createTable(db);
        const EvenementTask = await getstoreItems(db);
        //console.log(EvenementTask);
        dispatch({type: 'init', evenements: EvenementTask});
      }

      fetchFromStorage();

      /**
       * appeller la méthode qui set le theme qui à été choisi dans les préférence
       */
      setAppTheme();
      getAppTheme();
    } catch (error) {
      console.log('problème dans le useEffect de App,js: ', error);
    }
  }, [setAppTheme, getAppTheme]);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);
  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';

  //const value = console.log(showPermissionsPage);

  return (
    <NavigationContainer
      ref={navigationRef}
      /**
       * ancienne version de varible theme utilisé au cas oû
       * theme === 'dark' ? DarkTheme : DefaultTheme
       */
      theme={theme === 'dark' ? Colors.dark : Colors.light}>
      <EvenementsContext.Provider value={evenements}>
        <EvenementsDispatchContext.Provider value={dispatch}>
          <ThemeContext.Provider value={sendValueTheme}>
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
                  title: ' Athentification',

                  headerStyle: {
                    backgroundColor:
                      Colors[themeChoisi]?.colors.headerBackground,
                  },
                  headerTitleStyle: {
                    color: Colors[themeChoisi]?.colors.white,
                  },
                }}></Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
              <Stack.Screen
                name="Preference"
                component={Preference}
                options={{
                  title: 'Préférence',
                  headerStyle: {
                    backgroundColor:
                      Colors[themeChoisi]?.colors.headerBackground,
                  },
                  headerTitleStyle: {
                    color: Colors[themeChoisi]?.colors.white,
                  },
                }}></Stack.Screen>
              <Stack.Screen
                name="ListeEvenementInterface"
                component={ListeEvenementInterface}
                options={{
                  title: 'Acceuil',
                  headerStyle: {
                    backgroundColor:
                      Colors[themeChoisi]?.colors.headerBackground,
                  },
                  headerTitleStyle: {
                    color: Colors[themeChoisi]?.colors.white,
                  },
                }}></Stack.Screen>
              <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}></Stack.Screen>
              <Stack.Screen
                name="PermissionScreen"
                component={PermissionScreen}></Stack.Screen>
              <Stack.Screen
                name="Ajouterevent"
                component={Ajouterevent}
                options={{
                  title: 'Ajouter un évenement',
                  headerStyle: {
                    backgroundColor:
                      Colors[themeChoisi]?.colors.headerBackground,
                  },
                  headerTitleStyle: {
                    color: Colors[themeChoisi]?.colors.white,
                  },
                }}
              />

              <Stack.Screen
                name="DetailEvent"
                component={DetailEvent}
                options={({route}) => ({
                  title: route.params.name,
                  headerStyle: {
                    backgroundColor:
                      Colors[themeChoisi]?.colors.headerBackground,
                  },
                  headerTitleStyle: {
                    color: Colors[themeChoisi]?.colors.white,
                  },
                })}></Stack.Screen>
            </Stack.Navigator>
          </ThemeContext.Provider>
        </EvenementsDispatchContext.Provider>
      </EvenementsContext.Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
