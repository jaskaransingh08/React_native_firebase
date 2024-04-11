import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Components/Authentication/Login';
import Register from './src/Components/Authentication/Register';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Blank from './src/Components/Authentication/Blank';
import ForgotPassword from './src/Components/Authentication/Forgotpassword';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='register'
          >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="Home" component={Blank}  />
          <Stack.Screen name="Reset Password" component={ForgotPassword}  />


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
