import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA0Odoh67_IV357v33wXFM-yA4Fb2E24MM',
  authDomain: 'election-assistant-494823.firebaseapp.com',
  projectId: 'election-assistant-494823',
  storageBucket: 'election-assistant-494823.firebasestorage.app',
  messagingSenderId: '268328857051',
  appId: '1:268328857051:web:4d2126549affa3f7f3cbfe'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
