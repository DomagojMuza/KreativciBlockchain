import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDPdOjMHjWp3kqeVloXkZGorNvnCCZHEMo",
    authDomain: "shorttales-9fedb.firebaseapp.com",
    databaseURL: "https://shorttales-9fedb.firebaseio.com",
    projectId: "shorttales-9fedb",
    storageBucket: "shorttales-9fedb.appspot.com",
    messagingSenderId: "839886099365",
    appId: "1:839886099365:web:aa343057d2f481300a4e4c"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()