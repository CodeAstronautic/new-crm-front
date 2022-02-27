import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuhOJzfmY9BQjVXT-OisV2iV92gswrQBs",
  authDomain: "crm-software-4a890.firebaseapp.com",
  projectId: "crm-software-4a890",
  storageBucket: "crm-software-4a890.appspot.com",
  messagingSenderId: "961098447511",
  appId: "1:961098447511:web:57692dd72d4f857686c7d2",
  measurementId: "G-SPTSR4LWVD",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();
const storage = firebase.storage();
const uid = (firebaseAuth.currentUser || {}).uid;

export { firestore, firebaseAuth, storage, uid };
