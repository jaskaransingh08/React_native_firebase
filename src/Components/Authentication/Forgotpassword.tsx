import {  sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,Alert } from "react-native";
import {  auth } from "../Firebase/Firebase";

export default function ForgotPassword() {
    const [username, setUsername] = useState('');

	const handleforgot=async()=>{
        try {
            await sendPasswordResetEmail(auth, username);
            alert("Reset link sent successfully");
          } catch (error:any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert('Password Reset Failed', errorMessage);
          }
          
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Change Your Password</Text>
                <TextInput
                    style={styles.input}
                    inputMode="email"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
               
               
                <Button title="Forgot Password" onPress={handleforgot} />

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

