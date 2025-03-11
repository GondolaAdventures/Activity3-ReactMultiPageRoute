import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDhCBiX7VBhiRft0RxCFJp1OodJD_qzJ5U",
  authDomain: "articledemo-5edb7.firebaseapp.com",
  projectId: "articledemo-5edb7",
  storageBucket: "articledemo-5edb7.firebasestorage.app",
  messagingSenderId: "1020340575348",
  appId: "1:1020340575348:web:86781eaa246596d1668521"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();


  export {db}