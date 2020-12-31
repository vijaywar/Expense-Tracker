import './App.css';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import store from './store'
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import Login from './home/Login'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>

        <div className='body'>
          <Router>
            <Login />
          </Router>

        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
