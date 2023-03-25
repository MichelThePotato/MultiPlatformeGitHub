import {StyleSheet, View, TextInput, Button} from 'react-native';
import React, {useContext} from 'react';
import {storeUser, getUser} from './Storage';
import {ThemeContext} from './Context';
import Colors from '../theme/Colors';

const Signuppage = ({navigation}) => {
  const [username, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [users, setUsers] = React.useState([]);

  /**
   * amener le theme envoyé par ThemeContext dans le stack pour avoir accès au bonne couleur
   */
  const {themeChoisi, setThemeChoisi} = useContext(ThemeContext);
  const styles = getStyles(themeChoisi);

  async function loadUsers() {
    let initialUsers = await getUser();
    // console.log(initialUsers);
    setUsers(initialUsers);
  }

  React.useEffect(() => {
    loadUsers();
  }, []);

  const addEmail = async () => {
    let newUser = {
      id: 1,
      username: username,
      password: password,
    };
    console.log(users.length);
    loadUsers();
    await storeUser(newUser);
    console.log(users);
  };

  const onTextChange1 = text => {
    setUser(text);
  };

  const onTextChange2 = text => {
    setPassword(text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChange1}
        defaultValue={username}
        placeholder="Email"
        placeholderTextColor={'#DE5E69'}></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChange2}
        defaultValue={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={'#DE5E69'}></TextInput>
      <View style={{width: '70%', alignSelf: 'center'}}>
        <Button
          title={'Sign Up'}
          onPress={async () => {
            await addEmail();
            navigation.navigate('Login');
          }}
          disabled={!username || !password}></Button>
      </View>
    </View>
  );
};

export default Signuppage;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      // borderColor: "red",
      // borderWidth: 2,
      gap: 10,
      paddingTop: 20,
      backgroundColor: Colors[theme]?.colors.themeColor,
    },
    inputs: {
      width: '80%',
      borderColor: 'grey',
      borderWidth: 2,
      alignSelf: 'center',
      borderRadius: 15,
      color: Colors[theme]?.colors.white,
      textAlign: 'center',
    },
  });
