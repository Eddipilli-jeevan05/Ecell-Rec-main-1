import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAsMdkdVnvPo6OQsg3JCCoS-EiC3HNeN1M",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ecell-rec.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ecell-rec",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ecell-rec.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "363890310179",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:363890310179:web:bd08d942b973fd2d9e4596",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-MHY76R4ZTY"
};

// Check if Firebase config is valid
const isUsingPlaceholder = firebaseConfig.apiKey === "AIzaSyBvOkT3gZTgTa7TaK4HjCWTb6m2JjqXpXo" || 
                          firebaseConfig.projectId === "ecellrec" ||
                          firebaseConfig.messagingSenderId === "123456789012" ||
                          firebaseConfig.projectId === "demo";

if (isUsingPlaceholder) {
  console.warn("⚠️ Firebase configuration is using placeholder values!");
  console.warn("Please set up proper environment variables in Vercel:");
  console.warn("- NEXT_PUBLIC_FIREBASE_API_KEY");
  console.warn("- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  console.warn("- NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  console.warn("- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  console.warn("- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  console.warn("- NEXT_PUBLIC_FIREBASE_APP_ID");
} else {
  console.log("✅ Firebase configuration loaded successfully");
  console.log("Project ID:", firebaseConfig.projectId);
}

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  
  // Test the connection
  console.log("🔗 Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  
  // Don't use fallback config as it will cause more errors
  throw new Error("Firebase initialization failed. Please check your configuration.");
}

export { db, auth };
export default app; 
