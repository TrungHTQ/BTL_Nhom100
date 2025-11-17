import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBruwH3rURlPKRX1S5tDTDhyyiNGvMy2Ew",
  authDomain: "nhom100htn.firebaseapp.com",
  projectId: "nhom100htn",
  storageBucket: "nhom100htn.firebasestorage.app",
  messagingSenderId: "1002385846227",
  appId: "1:1002385846227:web:7c3324de29fcb8222d0926"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
