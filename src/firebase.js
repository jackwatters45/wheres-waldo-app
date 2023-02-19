import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCkkjP_cStEoo4pnQjszdJ0i_F3GjM2hVo',
  authDomain: 'where-s-waldo-app-f16e3.firebaseapp.com',
  projectId: 'where-s-waldo-app-f16e3',
  storageBucket: 'where-s-waldo-app-f16e3.appspot.com',
  messagingSenderId: '702329581372',
  appId: '1:702329581372:web:3186523e52bbe64d1ab839',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

// TODO set up dbs in firestore

// TODO how to add data to db
// import { collection, addDoc } from "firebase/firestore";
// import {db} from '../firebase';

//     const addTodo = async (e) => {
//         e.preventDefault();

//         try {
//             const docRef = await addDoc(collection(db, "todos"), {
//               todo: todo,
//             });
//             console.log("Document written with ID: ", docRef.id);
//           } catch (e) {
//             console.error("Error adding document: ", e);
//           }
//     }

// TODO read data
// import { collection, getDocs } from "firebase/firestore";
// import {db} from '../firebase';
// Import { useState } from ‘react’;

//    const [todos, setTodos] = useState([]);

//     const fetchPost = async () => {

//         await getDocs(collection(db, "todos"))
//             .then((querySnapshot)=>{
//                 const newData = querySnapshot.docs
//                     .map((doc) => ({...doc.data(), id:doc.id }));
//                 setTodos(newData);
//                 console.log(todos, newData);
//             })

//     }

//     useEffect(()=>{
//         fetchPost();
//     }, [])

// TODO something to allow the user to login -> if they want to save their score they need to log in

// TODO deploy
