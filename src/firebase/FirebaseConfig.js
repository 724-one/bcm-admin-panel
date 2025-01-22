// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// // const firebaseConfig = {
// //     // Your Firebase configuration object
// //     apiKey: "your-api-key",
// //     authDomain: "your-auth-domain",
// //     projectId: "your-project-id",
// //     storageBucket: "your-storage-bucket",
// //     messagingSenderId: "your-messaging-sender-id",
// //     appId: "your-app-id"
// // };

// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyAXNSe_LmCL4EqJSq0mP7aNOIBkMNiyckk",
//     authDomain: "projectwise-872da.firebaseapp.com",
//     projectId: "projectwise-872da",
//     storageBucket: "projectwise-872da.firebasestorage.app",
//     messagingSenderId: "422387211940",
//     appId: "1:422387211940:web:5babd5a217938705c95031",
//     measurementId: "G-G6SK2GB81W"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArXLDYLOWGCiPbvefVHZ-9fHLGn7930f4",
  authDomain: "bcm-app-f5ba8.firebaseapp.com",
  projectId: "bcm-app-f5ba8",
  storageBucket: "bcm-app-f5ba8.firebasestorage.app",
  messagingSenderId: "461288880214",
  appId: "1:461288880214:web:bc5a2917f67c07da35e3f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
