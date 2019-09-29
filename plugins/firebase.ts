import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyC0bpGzWuAualbd2EJlHbJc3q0MXs4iaa0",
    authDomain: "gdg-events-8aa66.firebaseapp.com",
    databaseURL: "https://gdg-events-8aa66.firebaseio.com",
    projectId: "gdg-events-8aa66",
    storageBucket: "gdg-events-8aa66.appspot.com",
    messagingSenderId: "555554688506"
  };
  firebase.initializeApp(config);
}
const fs = firebase.firestore();
const st = firebase.storage();
const fa = firebase.auth();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { fa, fs, st, GoogleProvider };
