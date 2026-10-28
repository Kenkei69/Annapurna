import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || "project-a9c284f8-6bca-440a-a0c";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyALFV0IqDjwDNc_MFyvpEme7uRnYiRgIpU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "887568501843",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:887568501843:web:e747db27d1f927cf8c4aa6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log("Testing connection by reading a document...");
    // getDoc must hit the server to know if it exists (or wait for offline cache, which we don't have here)
    const snapshot = await getDoc(doc(db, "cargos", "does_not_exist"));
    console.log("Read successful. Database exists and is accessible. Document exists?", snapshot.exists());
    process.exit(0);
  } catch (err) {
    console.error("CONNECTION FAILED:", err);
    process.exit(1);
  }
}

testConnection();
