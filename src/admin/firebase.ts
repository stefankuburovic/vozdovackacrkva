import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpeReDiSaesd71xLDbvyw3_HUY3UM3XVo",
    authDomain: "vozdovackacrkvamape.firebaseapp.com",
    projectId: "vozdovackacrkvamape",
    storageBucket: "vozdovackacrkvamape.appspot.com",
    messagingSenderId: "311000542823",
    appId: "1:311000542823:web:43e3eeb9fe79d98c7feec2",
    measurementId: "G-GVF5LD7V07"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };