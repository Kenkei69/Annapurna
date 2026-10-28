import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Firebase configuration supporting environment variables with dev fallbacks.
// Firebase API keys are public client identifiers; security is enforced by Firestore rules.
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || "project-a9c284f8-6bca-440a-a0c";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyALFV0IqDjwDNc_MFyvpEme7uRnYiRgIpU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "887568501843",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:887568501843:web:e747db27d1f927cf8c4aa6",
  ...(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? { measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID } : {}),
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
