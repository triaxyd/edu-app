import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD9d_5fQug3l479ejRaTxMGp_dFzwgTVmk",
    authDomain: "jsedu-27cda.firebaseapp.com",
    projectId: "jsedu-27cda",
    storageBucket: "jsedu-27cda.firebasestorage.app",
    messagingSenderId: "355588287657",
    appId: "1:355588287657:web:9bc87296b9bfb320c5cdb8",
    measurementId: "G-D7331M38D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
const auth = getAuth(app);

export { auth };
