import firebase from "firebase";
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC7xU6nUNUuEYDX6-jhMdzM7_w5ySFRCKk",
  authDomain: "quora-clone-cf804.firebaseapp.com",
  projectId: "quora-clone-cf804",
  storageBucket: "quora-clone-cf804.appspot.com",
  messagingSenderId: "398270854351",
  appId: "1:398270854351:web:767c9df001110e9aa233ba",
  measurementId: "G-NSY9TNFPZ6",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
export { db };

export default auth;
