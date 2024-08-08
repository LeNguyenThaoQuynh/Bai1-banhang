import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"hueman-8b16d","appId":"1:914319834767:web:69bb53e9f85a88453afafa","storageBucket":"hueman-8b16d.appspot.com","apiKey":"AIzaSyBKC3h0BsJOcDAG5iYoNBDCRLmwXKzYZwk","authDomain":"hueman-8b16d.firebaseapp.com","messagingSenderId":"914319834767"})), provideAuth(() => getAuth()), provideAnimationsAsync('noop')]
};
