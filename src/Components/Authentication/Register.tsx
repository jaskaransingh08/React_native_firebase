import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";
import {  auth } from "../Firebase/Firebase";

import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Pressable } from "react-native";

export default function Register() {
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, username, password);
            Alert.alert(
                'Message',
                'Your Registration was successful.',
                [
                  {
                    text: 'OK', 
                    onPress: () => {
                        navigation.navigate("Login");

                    },
                  },
                ],
                { cancelable: false } 
              );
            const user = userCredential.user;
            console.log(user);

           
        } catch (error:any) {
            // An error occurred
            const errorMessage = error.message;
            console.log(errorMessage);
            Alert.alert('Registration Failed', errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Yourself</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
             <View style={{marginVertical:9}}>
                <Button  title="Register" onPress={handleRegister} />
             </View>

            <View style={{flexDirection:"row",margin:20}}>
                <Text style={{fontSize:20}}>Already have an account?  </Text>
               <Pressable  onPress={()=>navigation.navigate("Login")} >
               <Text style={{fontSize:20,color:"blue"}}>Login</Text>
               </Pressable>
            </View>
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginBottom: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: "white"
    },
    txt:{
    }
});
