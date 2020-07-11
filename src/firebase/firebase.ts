import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAuiCjW-agJ6NMOSUsLc3jLLvgGKEgcRbk',
  authDomain: 'swiss-knife-61060.firebaseapp.com',
  databaseURL: 'https://swiss-knife-61060.firebaseio.com',
  projectId: 'swiss-knife-61060',
  storageBucket: 'swiss-knife-61060.appspot.com',
  messagingSenderId: '504772183559',
  appId: '1:504772183559:web:04ff0304ef5102b3094ca2',
  measurementId: 'G-3PD83J10W5',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const Google = new firebase.auth.GoogleAuthProvider()
const signInWithGoogle = () => auth.signInWithPopup(Google)
const signOut = () => auth.signOut()
const signInAnounymously = async () => {
  try {
    await firebase.auth().signInAnonymously()
  } catch (err) {
    console.log(err)
  }
}

export { auth, db, signInWithGoogle, signOut, firebase, signInAnounymously }
