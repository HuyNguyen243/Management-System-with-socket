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

// export const requestPermission = (setToken)=>{
//   Notification.requestPermission().then(permission =>{
//     if (permission === 'granted'){
//       const firebaseApp = initializeApp(firebaseConfig);
//       const messaging = getMessaging(firebaseApp);

//       return getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY}).then((currentToken) => {
//         if(currentToken){
//           setToken(currentToken)
//         }
//       }).catch((err) => {
//         setToken(null)
//       });
//     }else{
//       // console.log(" You dont have permission ")
//     }
//   })
// }
