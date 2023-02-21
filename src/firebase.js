import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

// TODO deploy
