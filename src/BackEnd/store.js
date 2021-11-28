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
    apiKey: "AIzaSyCAs-FvDr3jxuQVLZD1XLjeZFnyFf3L7Rs",
    authDomain: "dear-diary-hi.firebaseapp.com",
    projectId: "dear-diary-hi",
    storageBucket: "dear-diary-hi.appspot.com",
    messagingSenderId: "441916702122",
    appId: "1:441916702122:web:8116ae9611328ab73c3fd3",
    measurementId: "G-YNVSJ5PQWV"
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