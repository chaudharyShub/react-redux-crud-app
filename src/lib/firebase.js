import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvCnz0lNP35e9-sSFybvcaZXPm9jhptQk",
    authDomain: "crud-redux-app-5ba5c.firebaseapp.com",
    projectId: "crud-redux-app-5ba5c",
    storageBucket: "crud-redux-app-5ba5c.appspot.com",
    messagingSenderId: "65198730497",
    appId: "1:65198730497:web:b0a10518e8ac8d6ad43f00"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
