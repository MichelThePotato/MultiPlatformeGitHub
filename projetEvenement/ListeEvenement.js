import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import {
    createTable,
    getDBConnection,
    getstoreItems,
    savestoreItem,
} from './db-services';

const ListeEvenement = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadDataCallback();
      }, [loadDataCallback]);

    const loadDataCallback = useCallback(async () => {
        try {
            // const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
            const db = await getDBConnection();

            // // test pour savoir j'utilise la db sqlite et non le fetch
            // //const db = await getDBConnection();
            // const tableName = 'storeDataV19';
            // insertQuery = `INSERT OR REPLACE INTO ${tableName}(address,banner,city,lastVisit,latitude,longitude) values ( 'test address', 'test banner', 'test city', 'test lastVisit', 'test latitude', 'test longitude')`;
            // db.executeSql(insertQuery)

            await createTable(db);
            const storedTodoItems = await getstoreItems(db);

            if (storedTodoItems.length) {
                setData(storedTodoItems);
                console.log('storedTodoItems');
                console.log(storedTodoItems);
            } else {
               

                //setData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <View>
            <ScrollView>
        {data.map(evenement => (
          <Lieu key={evenement.id} evenement={evenement} />
        ))}
      </ScrollView>
        </View>
    )
}

export default ListeEvenement

const styles = StyleSheet.create({})