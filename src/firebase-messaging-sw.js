importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBirvwozyTpYlQDALVUDdkN8A4WFY5kDrY",
    authDomain: "wannabet-1aaf4.firebaseapp.com",
    projectId: "wannabet-1aaf4",
    storageBucket: "wannabet-1aaf4.appspot.com",
    messagingSenderId: "1070579777731",
    appId: "1:1070579777731:web:b685d1bd1bf527c1f3a276"
});
const messaging = firebase.messaging();