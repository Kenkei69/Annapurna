import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || "project-a9c284f8-6bca-440a-a0c";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyALFV0IqDjwDNc_MFyvpEme7uRnYiRgIpU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId: projectId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const cargosSnap = await getDocs(collection(db, "cargos"));
  console.log("=== CARGOS IN DATABASE ===");
  console.log("Total:", cargosSnap.size);
  cargosSnap.forEach(d => {
    const data = d.data();
    console.log(`  ${d.id}: status=${data.status}, qty=${data.quantityKg}, askingPrice=${data.askingPricePerKg}`);
  });

  const bidsSnap = await getDocs(collection(db, "bids"));
  console.log("\n=== BIDS IN DATABASE ===");
  console.log("Total:", bidsSnap.size);
  bidsSnap.forEach(d => {
    const data = d.data();
    console.log(`  ${d.id}: cargoId=${data.cargoId}, status=${data.status}, qty=${data.requestedQuantityKg}`);
  });

  process.exit(0);
}

check();
