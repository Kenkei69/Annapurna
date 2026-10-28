import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || "project-a9c284f8-6bca-440a-a0c";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyALFV0IqDjwDNc_MFyvpEme7uRnYiRgIpU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function wipeAndReset() {
  try {
    console.log("Fetching cargos...");
    const cargosSnapshot = await getDocs(collection(db, "cargos"));
    for (const d of cargosSnapshot.docs) {
      console.log("Deleting cargo:", d.id);
      await deleteDoc(d.ref);
    }
    
    console.log("Fetching bids...");
    const bidsSnapshot = await getDocs(collection(db, "bids"));
    for (const d of bidsSnapshot.docs) {
      console.log("Deleting bid:", d.id);
      await deleteDoc(d.ref);
    }
    
    console.log("CLEANUP SUCCESSFUL");
    process.exit(0);
  } catch (err) {
    console.error("FAILED:", err);
    process.exit(1);
  }
}

wipeAndReset();
