// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = { 
//     apiKey : "AIzaSyAYjpSfXS7QHCBymjD-xed3CD2I393Vl_Y" , 
//     authDomain : "touch-bd981.firebaseapp.com" , 
//     projectId : "touch-bd981" , 
//     storageBucket : "touch-bd981.appspot.com" , 
//     messagingSenderId : "92341641471" , 
//     appId : "1:92341641471:web:6a4204e7544c5e898dacca" , 
//     measurementId : "G-GLZ591JKNM" 
// };



// // export const onMessageListener = () =>
// //   new Promise((resolve) => {
// //     onMessage(messaging, (payload) => {
// //       console.log("payload", payload)
// //       resolve(payload);
// //     });
// //   });

// const requestPermission = () => {
//     Notification.requestPermission().then(permission => {
//         if(permission === "granted"){
//             const app = initializeApp(firebaseConfig);
//             const messaging = getMessaging(app);
            
//             getToken(messaging, { vapidKey: "BGIf5jZg3fr2F_swwO56ae7k2SIedXU4w_wJZLVRzSc6T4V5uhbIRpkvI76_nPuB9qTX7_L75h-7O-pZ8u6pNxU" })
//                   .then((currentToken) => {
//                     if (currentToken) {
//                       console.log('current token for client: ', currentToken);
//                       // Perform any other neccessary action with the token
//                     } else {
//                       // Show permission request UI
//                       console.log('No registration token available. Request permission to generate one.');
//                     }
//                   })
//                   .catch((err) => {
//                     console.log('An error occurred while retrieving token. ', err);
//             });
//         }else{
//             console.log("Do not have permission")
//         }
//     })
// }

// requestPermission()