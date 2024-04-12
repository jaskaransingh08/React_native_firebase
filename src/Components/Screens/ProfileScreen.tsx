import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { auth } from '../Firebase/Firebase';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);
  const image = "https://tse1.mm.bing.net/th?id=OIP.PVlF6gRYae7RZWIfKNlxAAHaIl&pid=Api&P=0&h=180"

  const navigation: NavigationProp<ParamListBase> =useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user:any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    },);

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login")
    } catch (error:any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <View style={styles.container1}>
        <View style={styles.container} >
            <View >
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.text1}>
                <Text style={styles.texta}>{user.email} </Text>

            </View>

        </View>
    <View style={styles.container4}>
        
            <TouchableOpacity onPress={()=>{navigation.navigate("Reset Password")}}>
            <View style={styles.function1}>
            <Text style={styles.texta}>Change </Text>
            </View>

            </TouchableOpacity>
               
        

        <TouchableOpacity onPress={handleLogout}>
        <View style={styles.function1}>
            <View>
            <Text style={styles.texta}>Logout </Text>
            </View>
               <View style={styles.container3}>
           
            </View>
        </View>
        </TouchableOpacity >

        </View>
    </View>
      ) : (
        <Text>Please login to view your profile</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
 
const styles = StyleSheet.create({
    image:
    {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    container: {
        padding: 10,
        flexDirection: "row"
    },
    text1: {
        fontSize: 20,
        padding: 2,
        marginLeft: 10,
        marginTop: 20,
    },
    texta: {
        fontSize: 20,
    },
    function1: {
        borderColor: "grey",
        borderRadius: 10,
        height: 60,
        padding: 10,
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:10,
        borderWidth:1
    },
    icon:{
        flex:1,
       alignItems:"flex-end"
    },
    container1:{
        paddingHorizontal:15,
        paddingTop:20,
        backgroundColor:"white",
        height:"100%"
    },
    container3:{
        flex:1,
        justifyContent:"center",
        alignItems:"flex-end"
    },
    container4:{
        paddingHorizontal:25,
        
    }

});
