import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


firebase.initializeApp({
    apiKey: "AIzaSyC46hAVFF5ly7DGSSdSMO0G9euFfeSoUzg",
    authDomain: "agilforyou-challenge.firebaseapp.com",
    databaseURL: "https://agilforyou-challenge.firebaseio.com",
    projectId: "agilforyou-challenge",
    storageBucket: "agilforyou-challenge.appspot.com",
    messagingSenderId: "285978990060"
  });



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
