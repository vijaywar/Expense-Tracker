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
    apiKey: "AIzaSyAvRUnxdzYkWZpEGJLZhwNTA-D27xl5B2w",
    authDomain: "homegymtnt.firebaseapp.com",
    projectId: "homegymtnt",
    storageBucket: "homegymtnt.appspot.com",
    messagingSenderId: "775625685527",
    appId: "1:775625685527:web:9a0e5699fbe9582aebfa52",
    measurementId: "G-3XJD6B5CZH"
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