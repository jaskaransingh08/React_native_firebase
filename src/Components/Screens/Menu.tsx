import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateTask from './CreateTask';
import Todos from './Todos';
import ProfileScreen from './ProfileScreen';
import UserContext from './UserContext';
const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <UserContext>
    <Tab.Navigator>
      <Tab.Screen name="Create Task" component={CreateTask}
      options={{
        tabBarIcon: ({ color, size }) => (
        null
        ),
        
        tabBarLabelStyle: {
          fontSize: 20, 
          marginBottom:10
        },
        headerShown:false
      }} />
      <Tab.Screen name="Task list" component={Todos} 
      options={{
        tabBarIcon: ({ color, size }) => (
        null

        ),
        tabBarLabelStyle: {
          fontSize: 20,
          marginBottom:10 
        },
        headerShown:false

      }}/>
       <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
        null

        ),
        tabBarLabelStyle: {
          fontSize: 20,
          marginBottom:10 
        },
        headerShown:false

      }}/>
    </Tab.Navigator>
    </UserContext>
  );
}