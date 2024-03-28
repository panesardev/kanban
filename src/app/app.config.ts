import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebase } from './providers/firebase.provider';
import { provideNgxs } from './providers/ngxs.provider';

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideFirebase(),
    provideNgxs(),
  ],
};
