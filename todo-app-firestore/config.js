import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB69wrQxZhxRzzhf7cq6QSnA4o0embSkEw",
  authDomain: "authentication-app-abc69.firebaseapp.com",
  databaseURL: "https://authentication-app-abc69-default-rtdb.firebaseio.com",
  projectId: "authentication-app-abc69",
  storageBucket: "authentication-app-abc69.appspot.com",
  messagingSenderId: "795818415555",
  appId: "1:795818415555:web:cd515fa9941bc07c759976",
  measurementId: "G-1TS76JY6B0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
