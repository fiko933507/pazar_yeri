import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCuwmhbdko4PwRgbPnponjcHxv0WiKlmYc',
  authDomain: 'pazar-yeri-a84ee.firebaseapp.com',
  projectId: 'pazar-yeri-a84ee',
  storageBucket: 'pazar-yeri-a84ee.firebasestorage.app',
  messagingSenderId: '800380102925',
  appId: '1:800380102925:android:7f1a5de51fd096fa202844',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return FirebaseAuth.initializeAuth(app, {
      persistence: (FirebaseAuth as typeof FirebaseAuth & {
        getReactNativePersistence: (storage: typeof AsyncStorage) => FirebaseAuth.Persistence;
      }).getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return FirebaseAuth.getAuth(app);
  }
})();
