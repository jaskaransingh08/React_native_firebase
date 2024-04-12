import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "./CreateSlice";
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootState } from "./Store";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MyContext } from "./UserContext";

interface Todo {
    id:any,
    Username:any,
    TaskName: string;
    Category: string; 
    Date: string;
    Description: string;
    Start: string;
    End: string;
  }

export default function Todos() {
    const todoItems = useSelector((state: RootState) => state.todos.todos)
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState<Todo[]>([]);
    const[data1,setdata1]=useState<string | undefined>(undefined)

   

    const data=useContext(MyContext)

    useEffect(() => {
      if (data) {
        setdata1(data.user);
      }
    });
    const handleRemoveItem = (index:number) => {
        dispatch(deleteTodo(index));
    };
    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('created', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedTasks: Todo[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    Username: data.Username,
                    TaskName: data.TaskName,
                    Category: data.Category,
                    Date: data.Date,
                    Description: data.Description,
                    Start: data.Start,
                    End: data.End
                };
            });
            setTasks(fetchedTasks);
        });
    
        return () => unsubscribe(); 
    }, []);
    console.log(tasks)

    const renderListItem = ({ item, index }: { item: Todo; index: number }) => (
        item.Username === data1 ? (
            <Swipeable
                renderRightActions={() => (
                    <View style={styles.rightSwipeAction}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </View>
                )}
                onSwipeableWillOpen={() => handleRemoveItem(item.id)}
            >
                <View style={styles.card}>
                    <Text style={styles.name}>{item.TaskName}</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Category:</Text>
                        <Text style={styles.value}>{item.Category}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>{item.Date}</Text>
                    </View>
                    <View style={[styles.row, styles.row1]}>
                        <Text style={styles.label}>Start:</Text>
                        <Text style={styles.value}>{item.Start}</Text>
                        <Text style={[styles.label, { marginLeft: 40 }]}>End:</Text>
                        <Text style={styles.value}>{item.End}</Text>
                    </View>
                    <Text style={styles.description}>{item.Description}</Text>
                </View>
            </Swipeable>
        ) : null
    );
    

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.listview}>
                <Text style={styles.text}>Todos List</Text>
            </View>
            <FlatList
                data={tasks}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: 8 }}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        width: "95%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
        position: "relative"
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333333"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    row1: {
        backgroundColor: "aqua",
        borderRadius: 5,
        padding: 4,
        width: 260
    },
    label: {
        fontSize: 16,
        marginRight: 5,
        color: "#666666",
    },
    value: {
        fontSize: 16,
        color: "#333333"
    },
    description: {
        fontSize: 16,
        color: "#333333",
        fontStyle: "italic"
    },
    deleteButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: "100%",
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    listview:{
        width:"100%",
        padding:20,
        marginTop:30
  },
    text:{
        fontSize:30,
        textAlign:"center"
    },
    rightSwipeAction:{
        borderWidth:0
    }
});
