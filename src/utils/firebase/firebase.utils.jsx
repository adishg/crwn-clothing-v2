// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDJzGgLO__k7s3KOH_own6MEDOg68eFUNc",
    authDomain: "crwn-clothing-db-ebcf8.firebaseapp.com",
    projectId: "crwn-clothing-db-ebcf8",
    storageBucket: "crwn-clothing-db-ebcf8.appspot.com",
    messagingSenderId: "715223593795",
    appId: "1:715223593795:web:e847dd517f08aa2368b5f6",
    measurementId: "G-6JM1CV3BLE"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalImformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'user', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalImformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}