import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB_EMSrc5iW3ZNj1fjONijUtvFtb08tBnQ",
    authDomain: "guilherme-bmi.firebaseapp.com",
    projectId: "guilherme-bmi",
    storageBucket: "guilherme-bmi.appspot.com",
    messagingSenderId: "414041128544",
    appId: "1:414041128544:web:228f127e21fd70433c8d05"
};

export const fbConfig = initializeApp(firebaseConfig);