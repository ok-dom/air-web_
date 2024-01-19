import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKCvm_5irAQ_GIt9w8mK-evbThi4Vupyc",
  authDomain: "ezon-1dedf.firebaseapp.com",
  projectId: "ezon-1dedf",
  storageBucket: "ezon-1dedf.appspot.com",
  messagingSenderId: "249841035094",
  appId: "1:249841035094:web:2b7a502354ae5582bb18f7",
  measurementId: "G-X9RHNJT62H"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseMessaging = getMessaging(firebaseApp);

var registration = null;

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/air-web_/firebase-messaging-sw.js").then(function(reg) {
		registration = reg;
	});
}

function PushPermission() {
	return new Promise(function(resolve, reject) {
		const permissionResult = Notification.requestPermission(function(result) {
			resolve(result);
		});

		if (permissionResult) {
			permissionResult.then(resolve, reject);
		}
	}).then(function(permissionResult) {
		if (permissionResult === "granted") {
			PushSubscribe();
		}
		else {
			throw new Error("We weren\'t granted permission.");
		}
	});
}

function PushSubscribe() {
	getToken(firebaseMessaging, { vapidKey: "BE7_yn2BMgVm7bubQrkUHqC7VP1-E-KdNwwz78X3Apo74CePlIpWs16_h2pYg6PtQgAr_4DdEVEJ7khRjcUzIxE" })
		.then(function(token) {
			if (token) {
			//...
			}
		}).catch(function(error) {
			console.error(error);
		}
	);
}

onMessage(firebaseMessaging, function(payload) {
	return registration.showNotification(
		payload.notification.title,
		{
			body: payload.notification.body,
			icon: "/air-web_/icon-512.png"
		}
	);
});
