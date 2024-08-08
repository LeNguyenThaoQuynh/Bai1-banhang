
import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User as FirebaseUser } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user: User = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  async login() {
    try {
      const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      const firebaseUser = credential.user;
      const user: User = {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
      };
      this.userSubject.next(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userSubject.next(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  isLoggedIn(): boolean {
    let isLoggedIn = false;
    this.currentUser.subscribe(user => {
      isLoggedIn = !!user;
    });
    return isLoggedIn;
  }
}
