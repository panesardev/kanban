import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User as AuthUser, GoogleAuthProvider, getAdditionalUserInfo, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { User, UserData, newUserData } from '../types/user.interface';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private auth = getAuth();
  private firestore = getFirestore();

  user$ = userChanges(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: UserData) => ({ ...user, ...data })),
        ) as Observable<User>;
      }
      else return of(null);
    }),
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
}

