import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVtPoUXFuq80EsPZLdoiCIMpG6QrhPmu0",
    authDomain: "my-project-9e0a6.firebaseapp.com",
    projectId: "my-project-9e0a6",
    storageBucket: "my-project-9e0a6.appspot.com",
    messagingSenderId: "408924923056",
    appId: "1:408924923056:web:bf61b85fa9699eab970775",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
