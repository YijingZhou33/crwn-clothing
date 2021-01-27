import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCpAM0_0z1n16qOrxSLnb1Gutp-rYnThFM",
  authDomain: "crwn-db-d206a.firebaseapp.com",
  projectId: "crwn-db-d206a",
  storageBucket: "crwn-db-d206a.appspot.com",
  messagingSenderId: "258670796916",
  appId: "1:258670796916:web:307b397f0752a5277b7121",
  measurementId: "G-5M7W1SV97N",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Always trigger the Google popup whenever we use Google Auth provider for authentication
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
