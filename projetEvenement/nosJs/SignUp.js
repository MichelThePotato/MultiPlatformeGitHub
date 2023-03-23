import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React from 'react';
import {storeUser, getUser} from './Storage';
import {useNavigation} from '@react-navigation/native';

const Signuppage = ({navigation}) => {
  const [username, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [users, setUsers] = React.useState([]);

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
        placeholder="Email"></TextInput>
      <TextInput
        style={styles.inputs}
        onChangeText={onTextChange2}
        defaultValue={password}
        secureTextEntry={true}
        placeholder="Password"></TextInput>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    // borderColor: "red",
    // borderWidth: 2,
    gap: 10,
    paddingTop: 20,
  },
  inputs: {
    width: '80%',
    borderColor: 'grey',
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
