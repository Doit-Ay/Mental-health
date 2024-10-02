// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB3xUNWC8KjDjAAxs47uBD2UChbABiTO9w',
  authDomain: 'health-342ec.firebaseapp.com',
  projectId: 'health-342ec',
  storageBucket: 'health-342ec.appspot.com',
  messagingSenderId: '792392008205',
  appId: '1:792392008205:web:6f63d58871d94c69bd8b44',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the createUserWithEmailAndPassword function
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
