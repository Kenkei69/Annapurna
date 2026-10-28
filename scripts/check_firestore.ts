import { Firestore } from '@google-cloud/firestore';

async function checkFirestore() {
  try {
    const firestore = new Firestore({
      projectId: process.env.GCP_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'project-a9c284f8-6bca-440a-a0c',
      ...(process.env.GOOGLE_APPLICATION_CREDENTIALS ? { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS } : {}),
    });
    
    console.log('Testing Firestore connection...');
    const docRef = firestore.collection('_test_conn').doc('ping');
    await docRef.set({ timestamp: Date.now() });
    
    console.log('✅ Firestore is ACTIVE and ready to use!');
    await docRef.delete();
  } catch (error: any) {
    console.error('❌ Firestore check failed:', error.message);
  }
}

checkFirestore();
