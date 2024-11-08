// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKNmAt7-JKakCNBut6MKhupNss4c_8Bnk",
  authDomain: "crud-fire-react-902d6.firebaseapp.com",
  projectId: "crud-fire-react-902d6",
  storageBucket: "crud-fire-react-902d6.appspot.com",
  messagingSenderId: "969798793660",
  appId: "1:969798793660:web:587fc282077716783413b9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Db = getFirestore(app);