import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState, useContext} from 'react';
import {getColorsPreferences, verifyUsers} from './Storage';
import {useTheme} from '@react-navigation/native';
import Colors from '../theme/Colors';
import {ThemeContext} from './Context';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /**
   * const pour aller chercher les couleurs du theme
   * envoyé dans le navigator container pour pouvoir les utiliser dans
   * le Stylesheet du stack affiché
   */
  // const colors = useTheme().colors;

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

  const onTextChange = text => {
    setEmail(text);
  };

  const onTextChange2 = text => {
    setPassword(text);
  };

  const confirmerUser = async () => {
    if (await verifyUsers(email, password)) {
      // setLogedon(true)
      navigation.navigate('ListeEvenementInterface');
    } else {
      console.log('Rip');
    }
  };
  return (
    <View style={styles.main_contain}>
      <Image
        style={styles.logo}
        source={require('../photos/Shin_chan_dumpling.jpg')}></Image>

      <View style={styles.placeholderContainer}>
        <TextInput
          style={[{height: 40}, styles.pourText]}
          placeholder={'Email'}
          onChangeText={onTextChange}
          defaultValue={email}
          placeholderTextColor={'#DE5E69'}
        />
      </View>
      <View style={styles.placeholderContainer}>
        <TextInput
          style={[{height: 40}, styles.pourText]}
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={onTextChange2}
          defaultValue={password}
          placeholderTextColor={'#DE5E69'}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.boutonNewUtilisateur}
          onPress={() => navigation.push('SignUp')}>
          <Text style={styles.pourText}>Nouvelle utilisateur?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boutonLogin}>
        <TouchableOpacity
          disabled={!email || !password}
          onPress={() => confirmerUser()}>
          <Text style={styles.boutonTextStyle}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const getStyles = theme =>
  StyleSheet.create({
    main_contain: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: Colors[theme]?.colors.themeColor,
      color: Colors[theme]?.colors.white,
    },

    title: {
      fontSize: 30,
    },
    placeholderContainer: {
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      width: '80%',
      borderColor: Colors[theme]?.colors.sky,
    },

    boutonLogin: {
      margin: 12,
      padding: 10,
      borderRadius: 10,
      width: '80%',
      borderWidth: 1,
      backgroundColor: '#708090',
    },

    boutonNewUtilisateur: {
      backgroundColor: 'transparent',
    },

    logo: {
      height: 50,
      width: 50,
    },
    boutonTextStyle: {
      height: 40,
      alignSelf: 'center',
      fontSize: 20,
      color: Colors[theme]?.colors.white,
    },

    pourText: {
      color: Colors[theme]?.colors.white,
    },
  });
