
// Import Firebase modules for app initialization, authentication, and Firestore database
import { initializeApp } from "firebase/app"; // Initializes the Firebase app
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Firebase authentication and Google provider
import { getFirestore, serverTimestamp } from "firebase/firestore"; // Firestore database and server timestamp

// Firebase configuration object containing the app's Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyDcJt9jPyyL0RMZX0a-NnWGYSi66IEYNFY", // API key for Firebase project
  authDomain: "fujiitchybun.firebaseapp.com", // Authentication domain
  projectId: "fujiitchybun", // Firebase project ID
  storageBucket: "fujiitchybun.firebasestorage.app", // Storage bucket for file uploads
  messagingSenderId: "430795025409", // Sender ID for Firebase Cloud Messaging
  appId: "1:430795025409:web:1486b3631dc84a61d56400", // App ID for the Firebase project
  measurementId: "G-D3DLDSL2DR" // Measurement ID for Google Analytics (if enabled)
};

// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other parts of the app
export const auth = getAuth(app); // Firebase authentication instance
export const provider = new GoogleAuthProvider(); // Google authentication provider
export const db = getFirestore(app); // Firestore database instance
export { serverTimestamp }; // Export serverTimestamp for adding timestamps to Firestore documents