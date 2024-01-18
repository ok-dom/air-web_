self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCvm_5irAQ_GIt9w8mK-evbThi4Vupyc",
  authDomain: "ezon-1dedf.firebaseapp.com",
  projectId: "ezon-1dedf",
  messagingSenderId: "249841035094",
  appId: "1:249841035094:web:2b7a502354ae5582bb18f7"
};
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
