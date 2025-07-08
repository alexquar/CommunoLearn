import { initializeApp, getApps } from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import {getAI, getGenerativeModel, GoogleAIBackend} from "firebase/ai";
const firebaseConfig = {
    apiKey: "AIzaSyBThxRGSeg7gru1XH9UNAS2UFYHVUhvtbo",
    authDomain: "communolearn.firebaseapp.com",
    projectId: "communolearn",
    storageBucket: "communolearn.firebasestorage.app",
    messagingSenderId: "1055811153359",
    appId: "1:1055811153359:web:660a8c53108c418120b6ba",
    measurementId: "G-HXYGERPSHQ"
  };


// Initialize Firebase
export const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth_app = getAuth(firebase_app);
export const provider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

const ai = getAI(firebase_app, {
  backend: new GoogleAIBackend()
});
export const model = getGenerativeModel(ai, {
  model: "gemini-1.5-flash"
})
