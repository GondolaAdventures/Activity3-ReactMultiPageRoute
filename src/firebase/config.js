import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "1020340575348",
  appId: "1020340575348"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();


  export {db}