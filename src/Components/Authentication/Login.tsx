import {  signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import {  auth } from "../Firebase/Firebase";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation: NavigationProp<ParamListBase> = useNavigation();

  
    const handleLogin = async () => {

            await signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {                   
                    const user = userCredential.user;
					console.log(user);
                   navigation.navigate("Home")                    
                })
                .catch((error:any) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert('Registration Failed', errorMessage);
                });
			}
	const handleforgot=async()=>{
       navigation.navigate("Reset Password")
          
        
    }
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    inputMode="email"
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
                <View style={{flexDirection:"row"}}>
                    <View style={{marginHorizontal:10}}>
                    <Button title="Login" onPress={handleLogin} />
                    </View>
                <Button title="Forgot Password" onPress={handleforgot} />

                </View>
             
                <View style={{flexDirection:"row",margin:20}}>
                <Text style={{fontSize:20}}>Don't have an account?  </Text>
               <Pressable  onPress={()=>navigation.navigate("Register")} >
               <Text style={{fontSize:20,color:"blue",textDecorationLine:"underline"}}>Register Here</Text>
               </Pressable>
            </View>
            
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginBottom:40
        
        
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
        backgroundColor:"white"

    },
   
});

