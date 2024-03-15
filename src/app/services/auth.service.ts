import { Injectable, inject } from '@angular/core';
import { Auth, User as AuthUser, GoogleAuthProvider, authState, getAdditionalUserInfo, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { User, UserData, newUserData } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap(user => user ? this.getUser(user) : of(null)),
  );

  readonly isAuthenticated$ = this.user$.pipe(
    map(user => !!user),
    tap(exists => !exists && this.router.navigateByUrl('/')),
  );

  async login(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUser(credential.user.uid, newUserData);
    }

    await this.router.navigateByUrl('/dashboard');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUser(uid: string, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }

  getUser(user: AuthUser): Observable<User> {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({ 
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        boards: data.boards,
       }))
    );
  }

}

