import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBupbesSteNQrxa6YmeXgNErGszHDR9-gE",
  authDomain: "react-chat-app-b1a1e.firebaseapp.com",
  databaseURL: "https://react-chat-app-b1a1e-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-b1a1e",
  storageBucket: "react-chat-app-b1a1e.appspot.com",
  messagingSenderId: "956563476124",
  appId: "1:956563476124:web:679f6f66cfbc03c8636759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
