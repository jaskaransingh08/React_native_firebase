import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA72uuHqVX3lYDo43frmGHU0serJ3T50es",
  authDomain: "jaskaran-business-investor.firebaseapp.com",
  projectId: "jaskaran-business-investor",
  storageBucket: "jaskaran-business-investor.appspot.com",
  messagingSenderId: "728811554774",
  appId: "1:728811554774:web:c4b933510d5c29df5c0677",
  measurementId: "G-NWH3ESTY0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)



export { db,storage,auth}