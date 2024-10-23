// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQzrI4qGLqtn73WxEpIj5TU3TqyeOGxYQ",
    authDomain: "weatherapp-f4c36.firebaseapp.com",
    projectId: "weatherapp-f4c36",
    storageBucket: "weatherapp-f4c36.appspot.com",
    messagingSenderId: "736680021480",
    appId: "1:736680021480:web:fff40bf60c5f7a6f76285d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;