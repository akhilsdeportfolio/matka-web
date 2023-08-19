// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');



firebase.initializeApp({
  apiKey: "AIzaSyCfjZq0MoUwj4__tZq8uITZ3WTOS6dx8fo",
  authDomain: "matka-jatka-fb.firebaseapp.com",
  projectId: "matka-jatka-fb",
  storageBucket: "matka-jatka-fb.appspot.com",
  messagingSenderId: "740359768202",
  appId: "1:740359768202:web:989c7ebf11c012a896c573",
  measurementId: "G-23DQ1LEGSH",
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 
 const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
