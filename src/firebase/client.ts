import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyEJ7j2hAa4kmd78aE4XY4tUeS9d5frRE",
  authDomain: "mocknext-b6c8d.firebaseapp.com",
  projectId: "mocknext-b6c8d",
  storageBucket: "mocknext-b6c8d.firebasestorage.app",
  messagingSenderId: "103363683516",
  appId: "1:103363683516:web:6775f951a0857ea3f75cb9",
  measurementId: "G-KLNPN9XN52",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
