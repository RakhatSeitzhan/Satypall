import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDVXkxm42Epq_yWGkMuVK7nTsAg-a139DI",
    authDomain: "satypall-21e17.firebaseapp.com",
    projectId: "satypall-21e17",
    storageBucket: "satypall-21e17.appspot.com",
    messagingSenderId: "123159376136",
    appId: "1:123159376136:web:3e6dff71dfa5e5fdc2fcbd",
    measurementId: "G-HEMNSY483L"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}