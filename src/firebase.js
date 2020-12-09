  
import firebase from "firebase/app";
import "firebase/storage";



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 

  const firebaseConfig = {
    apiKey: "AIzaSyAuDVOJQxWY4QseuwH9OYqttUhvrN-q5L0",
    authDomain: "dafah-v2.firebaseapp.com",
    projectId: "dafah-v2",
    storageBucket: "dafah-v2.appspot.com",
    messagingSenderId: "41921321159",
    appId: "1:41921321159:web:1aba64c0b24824c35d46e2",
    measurementId: "G-8FGH6RHDWR"
  };



  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { storage, firebase as default };