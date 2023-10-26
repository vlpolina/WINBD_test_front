import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUE-4Poh9j0-rpfiV2zQG-_6lUAtA_rLs",
  authDomain: "winbd-test-frontend.firebaseapp.com",
  databaseURL: "https://winbd-test-frontend-default-rtdb.firebaseio.com",
  projectId: "winbd-test-frontend",
  storageBucket: "winbd-test-frontend.appspot.com",
  messagingSenderId: "614266408650",
  appId: "1:614266408650:web:337850034bd04165eb2e33",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
