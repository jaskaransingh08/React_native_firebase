import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

interface Todo {
  Username:string|undefined,
  TaskName: string;
  Category: string;
  Date: string;
  Description: string;
  Start: string;
  End: string;
}

interface CounterState {
  todos: Todo[];
}

const initialState: CounterState = {
  todos: [],
};

const CreateSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state:CounterState, action: { payload: Todo; type: string; }) => {
      const newTodo=action.payload
      try {
        
        addDoc(collection(db, 'todos'), {
          Username:newTodo.Username,
          TaskName: newTodo.TaskName,
          Category: newTodo.Category,
          Date: newTodo.Date,
          Description: newTodo.Description,
          Start: newTodo.Start,
          End: newTodo.End,
          created: Timestamp.now()
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          // Handle error appropriately
        });
      } catch (error) {
        console.error("Error in addTodo reducer: ", error);
        // Handle error appropriately
      }
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      const taskDocRef = doc(db, 'todos', action.payload)
      try {
          deleteDoc(taskDocRef)
      } catch (err) {
          alert(err)
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ index: number; todo: Todo }>
    ) => {
      state.todos[action.payload.index] = action.payload.todo;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = CreateSlice.actions;
export default CreateSlice.reducer;
