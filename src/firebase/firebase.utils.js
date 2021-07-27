import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAU1INZi0U3Bi4ZuPSwfIM9aVKqu_SbSwk",
  authDomain: "authentication-68268.firebaseapp.com",
  databaseURL: "https://authentication-68268.firebaseio.com",
  projectId: "authentication-68268",
  storageBucket: "authentication-68268.appspot.com",
  messagingSenderId: "1047981725676",
  appId: "1:1047981725676:web:a6a03d3503e76aac",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
