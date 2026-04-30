import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAFQKbBSAhnpMv2A5A8THGqhHZFmNXP6Z0",
  authDomain: "producto-2-fp067.firebaseapp.com",
  databaseURL: "https://producto-2-fp067-default-rtdb.firebaseio.com",
  projectId: "producto-2-fp067",
  storageBucket: "producto-2-fp067.firebasestorage.app",
  messagingSenderId: "583706100820",
  appId: "1:583706100820:web:b85c40b7261776fcf559c1"
};

// Asegurarnos de que Firebase se inicialice solo una vez
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getDatabase(app);

export { app, db };
