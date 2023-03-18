import {
  openDatabase,
  enablePromise,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';


const tableName = 'storeDataV2';//10 good //16
enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'store.db', location: 'default' });
};

export const createTable = async db => {
  // create table if not exists

  //id INTEGER NOT NULL
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        'nom' TEXT NOT NULL,
        'addresse' TEXT NOT NULL,
        'descr' TEXT NOT NULL,
        'debut' TEXT NOT NULL,
        'fin' TEXT NOT NULL)`;

  await db.executeSql(query);
};

export const getstoreItems = async db => {
  try {
    const storeItems = [];
    const results = await db.executeSql(
      `SELECT id,nom,addresse,descr,debut,fin FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        storeItems.push(result.rows.item(index));
      }
    });
    return storeItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get storeItems !!!');
  }
};

export const savestoreItem = async (db, nom, addresse, descr, debut, fin) => {
  const insertQuery =
    // `INSERT OR REPLACE INTO ${tableName}(id,nom,addresse,descr,debut,fin) values` +
    // storeItems.map(i => `(${i.id}, '${i.addresse}', '${i.descr}', '${i.debut}', '${i.fin}')`).join(',');
    `INSERT INTO ${tableName}(id,nom,addresse,descr,debut,fin) VALUES` +
    `(0,?,?,?,?,?)`;
  return db.executeSql(insertQuery, [nom, addresse, descr, debut, fin]);
};

export const deleteTodoItem = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);
};