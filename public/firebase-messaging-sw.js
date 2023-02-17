// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: 'AIzaSyAYjpSfXS7QHCBymjD-xed3CD2I393Vl_Y',
	authDomain: 'touch-bd981.firebaseapp.com',
	projectId: 'touch-bd981',
	storageBucket: 'touch-bd981.appspot.com',
	messagingSenderId: '92341641471',
	appId: '1:92341641471:web:6a4204e7544c5e898dacca',
	measurementId: 'G-GLZ591JKNM',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
