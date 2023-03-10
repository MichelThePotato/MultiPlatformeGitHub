import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const Login = ({ navigation }) => {

    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")

    const onTextChange = text => {
        setEmail(text)
    }

    const onTextChange2 = text => {
        setPass(text)
    }

    return (
        <View style={styles.main_contain}>

            <Image style={styles.logo} source={require('./Shin_chan_dumpling.jpg')}></Image>


            <View style={styles.placeholderContainer}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder={"Email"}
                    onChangeText={onTextChange}
                    defaultValue={email} />
            </View>
            <View style={styles.placeholderContainer}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder={"Password"}
                    onChangeText={onTextChange2}
                    defaultValue={pass} />
            </View>

            <View >
                <TouchableOpacity
                    style={styles.boutonNewUtilisateur}
                    onPress={() => navigation.push('SignUp')}>
                    <Text >Nouvelle utilisateur?</Text>

                </TouchableOpacity>
            </View>

            <View style={styles.boutonLogin}>
                <TouchableOpacity
                    //disabled={!email || !pass}
                    onPress={() =>
                        navigation.navigate('ListeEvenement')

                    }>
                    <Text style={styles.boutonTextStyle} >LOGIN</Text>

                </TouchableOpacity>
            </View>

        </View >
    )
}

export default Login

const styles = StyleSheet.create({
    main_contain: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },

    title: {
        fontSize: 30,
    },
    placeholderContainer: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: "80%",

    },

    boutonLogin: {
        margin: 12,
        padding: 10,
        borderRadius: 10,
        width: "80%",
        borderWidth: 1,
        backgroundColor: '#708090'
    },

    boutonNewUtilisateur: {
        backgroundColor: 'transparent',
    },

    logo: {
        height: 50,
        width: 50
    },
    boutonTextStyle: {
        height: 40,
        alignSelf: 'center',
        fontSize: 20


    }

})