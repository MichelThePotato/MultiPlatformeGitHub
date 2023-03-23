import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUser = async user => {
  try {
    let users;
    let nextId = 1;
    const value = await EncryptedStorage.getItem('@storage_Key_User');
    if (value !== null) {
      // value previously stored
      users = JSON.parse(value);

      users.forEach(user => {
        if (user.id > nextId) nextId = user.id;
      });
      user.id = ++nextId;
      users.push(user);
    } else {
      user.id = nextId;
      users = [user];
    }

    const jsonValue = JSON.stringify(users);
    await EncryptedStorage.setItem('@storage_Key_User', jsonValue);
    console.log(nextId);
    console.log(jsonValue + 'dans storeUser');
    // console.log(value+ "dans storeUser"); avant la nouvelle valeur
    return nextId;
  } catch (e) {
    // saving error
  }
};

export const getUser = async () => {
  try {
    const value = await EncryptedStorage.getItem('@storage_Key_User');
    if (value == null) {
      // value previously stored
      return [];
    }
    return JSON.parse(value);
  } catch (e) {
    // error reading value
  }
};

// export const getUsers = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@storage_Key_User');
//     if (value == null) {
//       // value previously stored
//       return [];
//     }

//     return JSON.parse(value);
//   } catch (e) {
//     // error reading value
//   }
// };

export const verifyUsers = async (username, password) => {
  try {
    const value = await EncryptedStorage.getItem('@storage_Key_User');
    if (value != null) {
      Users = JSON.parse(value);
      let eff = false;
      Users.forEach(user => {
        if (user.username == username && user.password == password) {
          eff = true;
        }
      });

      // Users.forEach(user => {
      //    console.log(user.username == username && user.password == password);
      // });

      return eff;
    }
  } catch (e) {
    // error reading value
  }
};

export const getLogedOn = async () => {
  try {
    const value = await EncryptedStorage.getItem('@storage_Key_status');
    if (value == null) {
      // value previously stored
      // console.log(value);
      return [];
    }
    return JSON.parse(value);
  } catch (e) {
    // error reading value
  }
};

export const storeLogin = async login => {
  try {
    let users;
    let nextId = 1;
    const value = await EncryptedStorage.getItem('@storage_Key_status');
    if (value !== null) {
      // value previously stored
      users = JSON.parse(value);

      users.forEach(user => {
        if (user.id > nextId) nextId = user.id;
      });
      login.id = ++nextId;
      users.push(login);
    } else {
      login.id = nextId;
      users = [login];
    }

    const jsonValue = JSON.stringify(users);
    await EncryptedStorage.setItem('@storage_Key_status', jsonValue);
    console.log(nextId);
    console.log(users + '////////////////');
    return nextId;
  } catch (e) {
    // saving error
  }
};

export const updateLogin = async login => {
  try {
    const value = await EncryptedStorage.getItem('@storage_Key_status');
    if (value == null) return;
    let tasks = JSON.parse(value);
    const jsonValue = JSON.stringify(login);
    await EncryptedStorage.setItem('@storage_Key_status', jsonValue);
  } catch (e) {
    // saving error
  }
};
