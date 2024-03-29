importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCKCvm_5irAQ_GIt9w8mK-evbThi4Vupyc",
  authDomain: "ezon-1dedf.firebaseapp.com",
  projectId: "ezon-1dedf",
  storageBucket: "ezon-1dedf.appspot.com",
  messagingSenderId: "249841035094",
  appId: "1:249841035094:web:2b7a502354ae5582bb18f7",
  measurementId: "G-X9RHNJT62H"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  // Настраивайте обработку уведомления в фоновом режиме здесь
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: 'icon.png'
  };
   self.registration.showNotification(notificationTitle, notificationOptions);
});
