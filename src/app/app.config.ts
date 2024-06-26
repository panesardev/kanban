import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp as initializeFirebaseApp } from 'firebase/app';

initializeFirebaseApp({
  apiKey: "AIzaSyC01FiyNMH2PPvc7Tsdb572lABH6QVR4h8",
  authDomain: "ngx-kanban.firebaseapp.com",
  projectId: "ngx-kanban",
  storageBucket: "ngx-kanban.appspot.com",
  messagingSenderId: "602197176363",
  appId: "1:602197176363:web:3dfc12be090408e7bafa6e",
  measurementId: "G-4BBKE6GH7N"
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes, 
			withComponentInputBinding(), 
			withPreloading(PreloadAllModules), 
			withInMemoryScrolling({
      	scrollPositionRestoration: 'enabled',
    	}),
		),
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
};
