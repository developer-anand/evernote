import firebase from "firebase";
import "firebase/firestore";
// const firebase = require("firebase"); 
// require("firebase/firestore");


  // Your web app's Firebase configuration
  
// Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDj1le7LVT75t3cF5OSfNYOnzRaHBp4xbA",
      authDomain: "evernote-1aa2e.firebaseapp.com",
      projectId: "evernote-1aa2e",
      storageBucket: "evernote-1aa2e.appspot.com",
      messagingSenderId: "10561163810",
      appId: "1:10561163810:web:bc90d844dcf16b8788f07b"
    });

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { timestamp };
export default firebase;