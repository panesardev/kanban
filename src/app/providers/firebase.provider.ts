import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export function provideFirebase(): EnvironmentProviders {
  return importProvidersFrom(
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  );
}

const config = {
  apiKey: "AIzaSyC01FiyNMH2PPvc7Tsdb572lABH6QVR4h8",
  authDomain: "ngx-kanban.firebaseapp.com",
  projectId: "ngx-kanban",
  storageBucket: "ngx-kanban.appspot.com",
  messagingSenderId: "602197176363",
  appId: "1:602197176363:web:3dfc12be090408e7bafa6e",
  measurementId: "G-4BBKE6GH7N"
};