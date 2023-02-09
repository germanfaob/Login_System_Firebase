import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOy9kNsOd54MAbAQrmxywu_s4NXVvFfx4",
  authDomain: "fir-login-72e71.firebaseapp.com",
  projectId: "fir-login-72e71",
  storageBucket: "fir-login-72e71.appspot.com",
  messagingSenderId: "779114163683",
  appId: "1:779114163683:web:0a6df106bac4e0485ec4d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };