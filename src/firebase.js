import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0TR03w42gGknUKbi2IDMrVTdxx5F-mu8",
  authDomain: "slack-clone-40e0f.firebaseapp.com",
  projectId: "slack-clone-40e0f",
  storageBucket: "slack-clone-40e0f.appspot.com",
  messagingSenderId: "1063794099678",
  appId: "1:1063794099678:web:4912ee104a00e9e25f094f",
  measurementId: "G-Y03HDH4HVN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;