// ============================================
// AURIO MUSIC APP - FIREBASE CONFIGURATION
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyCMY1H6-QLhtUfo6J42Al3DkfAkd1b6qcE",
  authDomain: "aurio-music-app.firebaseapp.com",
  projectId: "aurio-music-app",
  storageBucket: "aurio-music-app.firebasestorage.app",
  messagingSenderId: "849403275884",
  appId: "1:849403275884:web:79a001b4cc1837c2260649"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Enable offline persistence
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence enabled in first tab only');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser does not support persistence');
  }
});
