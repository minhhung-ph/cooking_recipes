import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD9sMT1H0PWNxebrHVT7PSgSXRxvL5BpYs",
    authDomain: "cooking-recipes-d6eaf.firebaseapp.com",
    projectId: "cooking-recipes-d6eaf",
    storageBucket: "cooking-recipes-d6eaf.appspot.com",
    messagingSenderId: "382064915203",
    appId: "1:382064915203:web:68829296ca5a189384ef36"
  };

  firebase.initializeApp(firebaseConfig);
  const projectAuth = firebase.auth();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.Timestamp;
  export {projectFirestore, projectAuth, timestamp};