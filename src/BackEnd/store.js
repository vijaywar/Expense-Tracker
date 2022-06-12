import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from 'redux'
import {
    firebaseReducer
} from 'react-redux-firebase'

import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyC8a-de-6_Qojbzrfl1dCN2CP8YnxBtIso",
    authDomain: "expensetracki.firebaseapp.com",
    projectId: "expensetracki",
    storageBucket: "expensetracki.appspot.com",
    messagingSenderId: "887600901272",
    appId: "1:887600901272:web:5b774501b7ae775a4974ed",
    measurementId: "G-2TMBPG9TJ7"
}


// Initialize firebase instance
firebase.initializeApp(fbConfig)
// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state reactReduxFirebase(firebase),
const initialState = {}



const store = createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;